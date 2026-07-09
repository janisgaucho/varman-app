// src/app/dashboard/chantier/[id]/page.tsx
import { createClient } from '@/utils/supabase/server'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'

export default async function ChantierDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params
  const { id } = resolvedParams

  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Récupération des infos du chantier spécifique
  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  // Si l'URL est mauvaise ou si la RLS bloque l'accès, on renvoie une page 404
  if (error || !project) {
    notFound()
  }

  return (
    <div className="min-h-screen w-full flex flex-col p-8 md:p-12">
      <div className="w-full max-w-6xl mx-auto">
        
        {/* En-tête */}
        <div className="mb-10">
          <Link href="/dashboard" className="text-[#0071E3] text-sm font-medium hover:underline mb-4 inline-block">
            ← Retour aux chantiers
          </Link>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-[32px] font-semibold tracking-tight text-[#1D1D1F]">
                {project.name}
              </h1>
              <p className="text-[#86868B] mt-1 font-medium flex items-center gap-2">
                📍 {project.address || 'Aucune adresse renseignée'}
              </p>
            </div>
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white border border-black/4 shadow-sm text-[#1D1D1F] capitalize">
              {project.status.replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* Grille de contenu */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Colonne principale (Tâches, Notes, etc.) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-black/4">
              <h2 className="text-xl font-semibold text-[#1D1D1F] tracking-tight mb-4">Description</h2>
              <p className="text-[#1D1D1F] whitespace-pre-wrap leading-relaxed">
                {project.description || "Aucune description fournie pour ce chantier."}
              </p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-black/4 min-h-75 flex flex-col items-center justify-center">
              <p className="text-[#86868B] font-medium">L'espace des tâches arrivera ici</p>
            </div>
          </div>

          {/* Colonne latérale (Infos, Membres, Fichiers) */}
          <div className="flex flex-col gap-8">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-black/4">
              <h3 className="text-lg font-semibold text-[#1D1D1F] tracking-tight mb-4">Informations</h3>
              <div className="flex flex-col gap-4 text-sm">
                <div>
                  <span className="text-[#86868B] block mb-1">Créé le</span>
                  <span className="text-[#1D1D1F] font-medium">
                    {new Date(project.created_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                {/* On pourra ajouter d'autres infos ici (budget, dates, etc.) */}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}