// src/app/dashboard/compte/page.tsx
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { updateProfile } from './actions'

export default async function ComptePage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string; success?: string }>
}) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const resolvedParams = await searchParams
  const message = resolvedParams?.message
  const success = resolvedParams?.success === 'true'

  return (
    <div className="p-8 md:p-12 max-w-3xl mx-auto w-full">
      <div className="mb-10">
        <h1 className="text-[32px] font-semibold tracking-tight text-[#1D1D1F]">
          Mon Compte
        </h1>
        <p className="text-[#86868B] mt-1 font-medium">
          Gérez vos informations personnelles et vos préférences.
        </p>
      </div>

      <form action={updateProfile} className="bg-white rounded-3xl p-8 shadow-sm border border-black/4 flex flex-col gap-6">
        
        {message && (
          <p className="p-4 bg-red-50 text-red-600 text-sm font-medium rounded-xl">
            {message}
          </p>
        )}

        {success && (
          <p className="p-4 bg-emerald-50 text-emerald-600 text-sm font-medium rounded-xl">
            ✓ Vos informations ont été mises à jour avec succès.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="first_name" className="text-sm font-medium text-[#86868B]">Prénom</label>
            <input 
              type="text" 
              id="first_name" 
              name="first_name" 
              defaultValue={profile?.first_name || ''} 
              placeholder="Votre prénom"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F5F5F7]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all font-semibold text-[#1D1D1F] capitalize"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="last_name" className="text-sm font-medium text-[#86868B]">Nom</label>
            <input 
              type="text" 
              id="last_name" 
              name="last_name" 
              defaultValue={profile?.last_name || ''} 
              placeholder="Votre nom"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#F5F5F7]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all font-semibold text-[#1D1D1F] capitalize"
            />
          </div>
        </div>

        <div className="h-px bg-gray-100 w-full my-2"></div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-[#86868B]">Adresse Email</span>
          <span className="text-lg font-semibold text-gray-400 select-none cursor-not-allowed">
            {user.email} <span className="text-xs font-normal ml-2">(Non modifiable)</span>
          </span>
        </div>

        <div className="flex flex-col gap-1 mt-2">
          <span className="text-sm font-medium text-[#86868B]">Rôle</span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#F5F5F7] text-[#1D1D1F] w-fit">
            Maître d'œuvre
          </span>
        </div>

        {/* Bouton d'action de sauvegarde */}
        <div className="mt-4 pt-6 border-t border-gray-100 flex justify-end">
          <button 
            type="submit" 
            className="bg-[#0071E3] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#0077ED] transition-colors shadow-sm cursor-pointer"
          >
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  )
}