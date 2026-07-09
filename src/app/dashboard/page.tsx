// src/app/dashboard/page.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    redirect('/login')
  }

  const { data: projects, error: projectsError } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    // On utilise min-h-screen pour prendre toute la hauteur et w-full pour la largeur
    <div className="min-h-screen w-full flex flex-col p-8 md:p-12">
      
      <div className="flex justify-between items-end mb-10 w-full">
        <div>
          <h1 className="text-[32px] font-semibold tracking-tight text-[#1D1D1F]">
            Mes Chantiers
          </h1>
          <p className="text-[#86868B] mt-1 font-medium">
            Gérez vos suivis de travaux
          </p>
        </div>
        <Link href="/dashboard/nouveau" className="bg-[#0071E3] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#0077ED] transition-colors shadow-sm">
        + Nouveau Chantier
        </Link>
      </div>

      {projects && projects.length > 0 ? (
        // J'ai ajouté xl:grid-cols-4 pour que les cartes utilisent bien l'espace sur grand écran
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {projects.map((project: any) => (
            <Link
              key={project.id}
              href={`/dashboard/chantier/${project.id}`}
              className="block outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3] rounded-[24px]"
            >
              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-black/[0.04] hover:shadow-md transition-shadow h-full">
                <h2 className="text-xl font-semibold text-[#1D1D1F] tracking-tight">{project.name}</h2>
                <p className="text-sm text-[#86868B] mt-2 truncate font-medium">
                  📍 {project.address || 'Aucune adresse renseignée'}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#F5F5F7] text-[#1D1D1F] capitalize">
                    {project.status.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-[#86868B] font-medium">
                    {new Date(project.created_at).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        // flex-1 et min-h-[65vh] forcent la carte blanche à prendre l'espace restant
        <div className="flex-1 w-full flex flex-col items-center justify-center bg-white rounded-[32px] shadow-sm border border-black/[0.04] min-h-[65vh]">
          <div className="w-16 h-16 bg-[#F5F5F7] rounded-full flex items-center justify-center mb-5">
            <svg className="w-7 h-7 text-[#86868B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold tracking-tight text-[#1D1D1F]">Aucun chantier en cours</h3>
          <p className="mt-2 text-[#86868B] max-w-sm text-center text-sm font-medium">
            Vous n'avez pas encore de projet. Créez votre premier chantier pour commencer le suivi.
          </p>
        </div>
      )}
    </div>
  )
}