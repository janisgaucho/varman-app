// src/app/dashboard/nouveau/page.tsx
import Link from 'next/link'
import { createProject } from './actions'

export default async function NewProjectPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>
}) {
  const resolvedParams = await searchParams;
  const message = resolvedParams?.message;

  return (
    <div className="min-h-screen w-full flex flex-col p-8 md:p-12">
      <div className="max-w-2xl mx-auto w-full">
        <div className="mb-8">
          <Link href="/dashboard" className="text-[#0071E3] text-sm font-medium hover:underline mb-4 inline-block">
            ← Retour aux chantiers
          </Link>
          <h1 className="text-[32px] font-semibold tracking-tight text-[#1D1D1F]">
            Nouveau Chantier
          </h1>
          <p className="text-[#86868B] mt-1 font-medium">
            Saisissez les informations initiales du projet
          </p>
        </div>

        <form action={createProject} className="bg-white rounded-[24px] p-8 shadow-sm border border-black/[0.04] flex flex-col gap-6">
          
          {message && (
            <p className="p-4 bg-red-50 text-red-600 text-sm font-medium rounded-xl">
              {message}
            </p>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-[#1D1D1F]">Nom du chantier *</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required 
              placeholder="Ex: Rénovation Villa Horizon" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#F5F5F7]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="address" className="text-sm font-medium text-[#1D1D1F]">Adresse</label>
            <input 
              type="text" 
              id="address" 
              name="address" 
              placeholder="Ex: 12 rue des Alizés" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#F5F5F7]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm font-medium text-[#1D1D1F]">Description rapide</label>
            <textarea 
              id="description" 
              name="description" 
              rows={4}
              placeholder="Détails du projet, contraintes spécifiques..." 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#F5F5F7]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all resize-none"
            />
          </div>

          <div className="mt-4 pt-6 border-t border-gray-100 flex justify-end gap-3">
            <Link href="/dashboard" className="px-5 py-2.5 rounded-full text-sm font-medium text-[#1D1D1F] bg-[#F5F5F7] hover:bg-[#E5E5EA] transition-colors">
              Annuler
            </Link>
            <button type="submit" className="bg-[#0071E3] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#0077ED] transition-colors shadow-sm">
              Créer le projet
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}