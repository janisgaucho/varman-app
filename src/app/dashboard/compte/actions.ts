// src/app/dashboard/compte/actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function updateProfile(formData: FormData) {
  const supabase = createClient()
  
  // 1. Vérifier l'utilisateur connecté
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  const firstName = formData.get('first_name') as string
  const lastName = formData.get('last_name') as string

  // 2. Mettre à jour la table profiles
  const { error } = await supabase
    .from('profiles')
    .update({
      first_name: firstName,
      last_name: lastName,
    })
    .eq('id', user.id)

  if (error) {
    redirect('/dashboard/compte?message=Erreur lors de la mise à jour')
  }

  // 3. Rafraîchir le cache pour mettre à jour instantanément le header et la page
  revalidatePath('/dashboard', 'layout')
  redirect('/dashboard/compte?success=true')
}