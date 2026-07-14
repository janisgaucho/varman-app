// src/app/dashboard/compte/actions.ts
'use server'

import 'server-only'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function updateProfile(formData: FormData) {
  const supabase = createClient()

  const firstName = formData.get('first_name') as string
  const lastName = formData.get('last_name') as string
  const newPassword = formData.get('new_password') as string | null
  const confirmPassword = formData.get('confirm_password') as string | null

  let passwordChanged = false;

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  // Étape 1: Mettre à jour le mot de passe si fourni
  if (newPassword) {
    if (newPassword !== confirmPassword) {
      redirect('/dashboard/compte?message=Les mots de passe ne correspondent pas.')
    }
    if (newPassword.length < 6) {
      redirect('/dashboard/compte?message=Le mot de passe doit contenir au moins 6 caractères.')
    }

    const { error: passwordError } = await supabase.auth.updateUser({ password: newPassword })

    if (passwordError) {
      console.error('Erreur de mise à jour du mot de passe:', passwordError)
      redirect(`/dashboard/compte?message=${passwordError.message}`)
    }
    passwordChanged = true;
  }

  // Étape 2: Mettre à jour le profil
  const { error } = await supabase
    .from('profiles')
    .update({
      first_name: firstName,
      last_name: lastName,
    })
    .eq('id', user.id)

  if (error) {
    console.error('Erreur de mise à jour du profil:', error)
    redirect(`/dashboard/compte?message=Erreur profil: ${error.message}`)
  }

  revalidatePath('/dashboard/compte')
  const successMessage = passwordChanged ? "Profil et mot de passe mis à jour avec succès." : "Profil mis à jour avec succès.";
  // On utilise un message de succès différent pour éviter de le confondre avec le paramètre 'success' booléen
  redirect(`/dashboard/compte?success_message=${encodeURIComponent(successMessage)}`)
}