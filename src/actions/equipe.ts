'use server'

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

/**
 * Récupère tous les profils utilisateurs depuis la base de données.
 */
export async function getEquipe() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*');

  if (error) {
    console.error("Erreur Supabase [getEquipe]:", error);
    return [];
  }
  return data;
}

/**
 * Récupère tous les projets pour les menus de sélection.
 */
export async function getProjects() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('id, name')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Erreur Supabase [getProjects]:", error);
    return [];
  }
  return data;
}

/**
 * Ajoute un nouvel utilisateur (auth) et son profil.
 * Nécessite les droits d'administration (service_role).
 */
export async function addUser(formData: FormData) {
  // NOTE: Cette action nécessite un client Supabase avec les droits d'administration
  // pour pouvoir créer des utilisateurs. Assurez-vous que SUPABASE_SERVICE_ROLE_KEY
  // est défini dans vos variables d'environnement.
  const supabase = createClient();

  const email = formData.get('email') as string;
  const password = Math.random().toString(36).slice(-8); // Génère un mot de passe temporaire
  const firstName = formData.get('first_name') as string;
  const lastName = formData.get('last_name') as string;
  const role = formData.get('role') as string;
  const projectId = formData.get('project_id') as string | null;

  // Étape 1: Créer l'utilisateur dans Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // Marque l'email comme vérifié
  });

  if (authError || !authData.user) {
    console.error("Erreur Supabase Auth [addUser]:", authError);
    return { error: authError?.message || "Erreur lors de la création de l'authentification." };
  }

  // Étape 2: Créer le profil correspondant dans la table 'profiles'
  const { error: profileError } = await supabase
    .from('profiles')
    .insert({
      id: authData.user.id,
      first_name: firstName,
      last_name: lastName,
      role: role,
    });

  if (profileError) {
    console.error("Erreur Supabase Profile [addUser]:", profileError);
    // Idéalement, il faudrait supprimer l'utilisateur créé à l'étape 1 pour nettoyer
    return { error: profileError.message || "Erreur lors de la création du profil." };
  }

  // Étape 3: Si un chantier est sélectionné, lier l'utilisateur au chantier
  if (projectId) {
    const { error: memberError } = await supabase
      .from('project_members')
      .insert({
        project_id: projectId,
        user_id: authData.user.id,
        role: role, // Le rôle sur le projet est le même que son rôle général
      });

    if (memberError) {
      console.error("Erreur Supabase [addUser to project]:", memberError);
      return { error: "Erreur lors de l'assignation au chantier." };
    }
  }

  revalidatePath('/dashboard/equipe');
  return { success: true };
}

/**
 * Supprime un utilisateur (auth et profil).
 * Nécessite les droits d'administration (service_role).
 */
export async function deleteUser(userId: string) {
  // NOTE: Cette action nécessite un client Supabase avec les droits d'administration.
  const supabase = createClient();

  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    console.error("Erreur Supabase Auth [deleteUser]:", error);
    // Gérer l'erreur, peut-être retourner un message
    return { error: error.message || "Impossible de supprimer l'utilisateur." };
  }

  // La suppression du profil se fait en cascade grâce à la clé étrangère
  // configurée dans la base de données.

  revalidatePath('/dashboard/equipe');
  return { success: true };
}