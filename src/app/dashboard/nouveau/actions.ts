// src/app/dashboard/nouveau/actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function createProject(formData: FormData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const file = formData.get('devis') as File
  if (!file || file.size === 0) {
    return redirect('/dashboard/nouveau?message=Aucun fichier fourni.')
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  
  // 3. Convertir en Base64 pour l'API Gemini
  const base64Data = buffer.toString('base64');
  
  try {
    // 4. Initialiser l'IA
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash' });
  
    // 5. Demander une extraction JSON stricte
  const prompt = `Analyse ce devis de travaux et retourne UNIQUEMENT un objet JSON valide avec les clés suivantes :
  - "reference" (ex: D-260449)
  - "client_name" (Le nom de famille ou l'entreprise, ex: NGO)
  - "client_address" (L'adresse d'intervention complète, ex: 4 Allée Bougainville 77200 Torcy France)
  - "tasks" (Un tableau de chaînes de caractères listant uniquement la désignation de chaque ligne de travaux du tableau, ex: ["Dépose papiers peint, enduit...", "Pose de carrelage au sol"])
  - "total_ttc" (Le montant total TTC, ex: 429,00)
  Ne renvoie aucun autre texte, pas de balises markdown, uniquement le JSON pur.`;
  
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: 'application/pdf'
        }
      }
    ]);
  
    // 6. Nettoyer et parser la réponse JSON
    const rawText = result.response.text();
    const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    const extractedData = JSON.parse(cleanJson);
  
    // 7. Préparer les données pour Supabase
    const name = `Chantier - ${extractedData.client_name}`;
    const description = `Devis réf: ${extractedData.reference}
Adresse: ${extractedData.client_address}
Montant total: ${extractedData.total_ttc} € TTC

Travaux à réaliser :
- ${extractedData.tasks.join('\n- ')}`;
  
    // --- PLACE ICI LA SUITE DE TON CODE (L'insertion dans Supabase projects & project_members) ---
    // 1. Création du chantier
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .insert({
        name,
        description,
        address: extractedData.client_address,
        status: 'en_preparation'
      })
      .select()
      .single()
  
    if (projectError || !project) {
      console.error("Erreur détaillée Supabase (création projet) :", projectError)
      redirect('/dashboard/nouveau?message=Erreur lors de la création')
    }
  
    // 2. Assignation de l'utilisateur au chantier (Crucial pour la RLS)
    const { error: memberError } = await supabase
      .from('project_members')
      .insert({
        project_id: project.id,
        user_id: user.id,
        role: 'maitre_oeuvre'
      })
  
    if (memberError) {
      console.error("Erreur détaillée Supabase (assignation membre) :", memberError)
      redirect('/dashboard/nouveau?message=Erreur lors de l\'assignation')
    }
  
  } catch (error) {
    console.error("Erreur d'analyse IA :", error);
    redirect('/dashboard/nouveau?message=Erreur lors de l\'analyse du devis par l\'IA');
  }

  // 3. Rechargement du dashboard et redirection
  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function deleteProject(formData: FormData) {
  const projectId = formData.get('id') as string;
  console.log("=== DEBUG SUPPRESSION ===");
  console.log("1. ID du chantier :", projectId);
  
  // 1. Initialisation de Supabase et vérification stricte de la session
  const supabase = createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    console.log("2. ERREUR AUTH : Serveur incapable de lire la session.", authError?.message);
    // On stoppe tout et on redirige
    redirect('/login?message=Session expirée ou introuvable. Veuillez vous reconnecter.');
  }
  
  console.log("2. ID Utilisateur serveur :", user.id);

  // --- LA SUITE DE TON CODE (La requête .delete() avec Supabase) ---
  const { data, error } = await supabase
    .from('projects')
    .delete()
    .eq('id', projectId)
    .select();
  
  console.log("3. Réponse Supabase - Erreur :", error);
  
  if (error) {
    console.log("ERREUR SQL CRITIQUE :", error.message);
    return { error: 'Erreur SQL: ' + error.message };
  }
  
  if (!data || data.length === 0) {
    console.log("Suppression silencieusement bloquée (RLS ou introuvable).");
    return { error: 'Erreur de droits de suppression.' };
  }

  // 6. Succès : revalidation et redirection
  revalidatePath('/dashboard');
  return { success: true };
}