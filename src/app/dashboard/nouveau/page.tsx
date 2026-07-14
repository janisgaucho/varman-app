// src/app/dashboard/nouveau/page.tsx
import Link from 'next/link'
import { createProject } from './actions'
import FileUploader from './FileUploader'
import { ArrowLeft } from 'lucide-react'
import { getDictionary } from '@/lib/dictionary'

import { Metadata } from 'next'
export const metadata: Metadata = {
  title: "Nouveau chantier",
};

export default async function NewProjectPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>
}) {
  const dict = await getDictionary();
  const resolvedParams = await searchParams;
  const message = resolvedParams?.message;

  return (
    <div className="w-full flex flex-col items-center pt-12 mt-8">
      <div className="relative max-w-2xl w-full px-4">
        {/* Bouton de retour positionné en absolu et visible uniquement sur les écrans md et plus */}
        <Link href="/dashboard" className="hidden md:inline-flex absolute top-2 -left-32 items-center justify-center gap-2 border rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all">
          <ArrowLeft className="w-4 h-4" />
<span>{dict.retour}</span>        </Link>

        <div className="mb-6">
          <h1 className="text-[32px] font-semibold tracking-tight text-[#1D1D1F]">{dict.nouveau_chantier_titre}</h1>
          <p className="text-[#86868B] mt-2 font-medium">{dict.nouveau_chantier_description}</p>
        </div>

        <form action={createProject} className="bg-white rounded-[24px] p-8 shadow-sm border border-black/4 flex flex-col gap-6">
          
          {message && (
            <p className="p-4 bg-red-50 text-red-600 text-sm font-medium rounded-xl">
              {message}
            </p>
          )}

          {/* C'est ici qu'on appelle notre zone de Drop Client */}
          <FileUploader />

          <div className="mt-4 pt-6 border-t border-gray-100 flex justify-end gap-3">
            <Link href="/dashboard" className="px-5 py-2.5 rounded-full text-sm font-medium text-[#1D1D1F] bg-[#F5F5F7] hover:bg-[#E5E5EA] transition-colors">
              {dict.nouveau_chantier_bouton_annuler}
            </Link>
            <button type="submit" className="bg-[#0071E3] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#0077ED] transition-colors shadow-sm cursor-pointer">
              {dict.nouveau_chantier_bouton_creer}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}