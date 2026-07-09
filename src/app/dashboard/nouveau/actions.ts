// src/app/dashboard/nouveau/actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function createProject(formData: FormData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const name = formData.get('name') as string
  const address = formData.get('address') as string
  const description = formData.get('description') as string

  // 1. Création du chantier
  const { data: project, error: projectError } = await supabase
    .from('projects')
    .insert({
      name,
      address,
      description,
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

  // 3. Rechargement du dashboard et redirection
  revalidatePath('/dashboard')
  redirect('/dashboard')
}