// src/app/dashboard/nouveau/page.tsx
import { getDictionary } from '@/lib/dictionary'
import NewProjectClientPage from './NewProjectClientPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Nouveau chantier",
};

export default async function NewProjectPage() {
  const dict = await getDictionary();

  return (
    <NewProjectClientPage dict={dict} />
  )
}