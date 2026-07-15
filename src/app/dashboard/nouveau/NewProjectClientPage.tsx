// src/app/dashboard/nouveau/NewProjectClientPage.tsx
'use client'

import { useFormStatus } from 'react-dom'
import Link from 'next/link'
import { createProject } from './actions'
import FileUploader from './FileUploader'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { DictionaryProvider, useDictionary } from '@/components/DictionaryProvider'
import { Dictionary } from '@/lib/dictionary'

function SubmitButton() {
  const { pending } = useFormStatus()
  const dict = useDictionary()

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="bg-[#0071E3] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#0077ED] transition-colors shadow-sm cursor-pointer disabled:bg-blue-400 disabled:cursor-wait flex items-center justify-center w-[180px]"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {dict.nouveau_chantier_bouton_analyse}
        </>
      ) : (
        dict.nouveau_chantier_bouton_creer
      )}
    </button>
  )
}

function NewProjectForm() {
  const dict = useDictionary()
  const searchParams = useSearchParams()
  const message = searchParams.get('message')

  return (
    <form action={createProject} className="bg-white rounded-[24px] p-8 shadow-sm border border-black/4 flex flex-col gap-6">
      {message && (
        <p className="p-4 bg-red-50 text-red-600 text-sm font-medium rounded-xl">
          {message}
        </p>
      )}
      <FileUploader />
      <div className="mt-4 pt-6 border-t border-gray-100 flex justify-end gap-3">
        <Link href="/dashboard" className="px-5 py-2.5 rounded-full text-sm font-medium text-[#1D1D1F] bg-[#F5F5F7] hover:bg-[#E5E5EA] transition-colors">
          {dict.nouveau_chantier_bouton_annuler}
        </Link>
        <SubmitButton />
      </div>
    </form>
  )
}

export default function NewProjectClientPage({ dict }: { dict: Dictionary }) {
  return (
    <DictionaryProvider dictionary={dict}>
      <div className="w-full flex flex-col items-center pt-12 mt-8">
        <div className="relative max-w-2xl w-full px-4">
          <Link href="/dashboard" className="hidden md:inline-flex absolute top-2 -left-32 items-center justify-center gap-2 border rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all">
            <ArrowLeft className="w-4 h-4" />
            <span>{dict.retour}</span>
          </Link>

          <div className="mb-6">
            <h1 className="text-[32px] font-semibold tracking-tight text-[#1D1D1F]">{dict.nouveau_chantier_titre}</h1>
            <p className="text-[#86868B] mt-2 font-medium">{dict.nouveau_chantier_description}</p>
          </div>

          <NewProjectForm />
        </div>
      </div>
    </DictionaryProvider>
  )
}