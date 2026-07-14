import { getDictionary } from '@/lib/dictionary';
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link';
import { MoreVertical, Plus } from 'lucide-react'
import { ProjectActions } from './ProjectActions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Metadata } from 'next'
export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const supabase = createClient()
  const dict = await getDictionary();

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return redirect('/login')
  }

  const { data: projects, error } = await supabase
    .from('projects')
    .select(`
      id,
      name,
      address,
      status,
      created_at
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error("Erreur de chargement des projets:", error.message)
    // Vous pourriez afficher un message d'erreur ici
  }

  return (
    <div className="w-full flex flex-col p-8 md:p-12">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-semibold tracking-tighter text-gray-900">
              {dict.dashboard_page_title}
            </h1>
            <p className="text-gray-500 text-sm mt-1">{dict.dashboard_subtitle}</p>
          </div>
          <Link href="/dashboard/nouveau" className="inline-flex items-center justify-center gap-2 bg-[#0071E3] text-white pl-4 pr-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#0077ED] transition-colors shadow-sm">
            <Plus className="h-4 w-4" />
            <span>{dict.dashboard_new_project_button}</span>
          </Link>
        </div>

        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col relative">
                <div className="flex-1">
                  <h2 className="font-semibold text-gray-800 tracking-tight pr-8">{project.name}</h2>
                  <p className="text-sm text-gray-500 mt-1.5">{project.address}</p>
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <span className="text-xs text-gray-400 font-medium">{dict.dashboard_project_card_created_date} {new Date(project.created_at).toLocaleDateString('fr-FR')}</span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 capitalize">
                    {project.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200">
                      <MoreVertical className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white rounded-xl shadow-lg border p-1 min-w-40">
                      <DropdownMenuItem className="cursor-pointer text-gray-900 font-normal focus:bg-gray-100 focus:text-gray-900 rounded-lg p-2">
                        <Link href={`/dashboard/chantier/${project.id}`}>
                          {dict.dashboard_project_card_view}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="my-1 bg-gray-100" />
                      <ProjectActions projectId={project.id} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-16 mt-8 text-center border-2 border-dashed rounded-lg bg-gray-50/50">
            <h3 className="text-lg font-semibold text-gray-800">{dict.dashboard_empty_state_title}</h3>
            <p className="mt-2 text-sm text-gray-500">{dict.dashboard_empty_state_description}</p>
          </div>
        )}
      </div>
    </div>
  );
}