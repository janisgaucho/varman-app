'use client'

import { useDictionary } from '@/components/DictionaryProvider'
import { createClient } from '@/utils/supabase/client'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import {
  Calendar,
  CheckCircle2,
  Euro,
  FileText,
  MapPin,
  Map,
  Navigation,
  ChevronRight,
  ArrowLeft,
  ImagePlus,
} from 'lucide-react';
import { useEffect, useState, use } from 'react';

export default function ChantierDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params);
  const [project, setProject] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('fiche')
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(0);
  const dict = useDictionary();
  const supabase = createClient()

  useEffect(() => {
    const fetchProject = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) redirect('/login')

      const { data: projectData, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single()

      if (error || !projectData) {
        notFound()
      }
      setProject(projectData)
    }
    fetchProject()
  }, [id, supabase])

  // --- Extraction des données depuis la description ---
  const descriptionLines = project?.description?.split('\n') || []
  const referenceLine = descriptionLines.find((line: string) => line.startsWith('Devis réf:'))
  const totalLine = descriptionLines.find((line: string) => line.startsWith('Montant total:'))
  const tasksLineIndex = descriptionLines.findIndex((line: string) => line.startsWith('Travaux à réaliser :'))

  const reference = referenceLine ? referenceLine.replace('Devis réf: ', '').trim() : dict.chantier_ref_not_available
  const total = totalLine ? parseFloat(totalLine.match(/(\d+[.,]?\d*)/)?.[0].replace(',', '.') || '0') : 0
  const tasks = tasksLineIndex !== -1 ? descriptionLines.slice(tasksLineIndex + 1).filter((line: string) => line.trim().startsWith('-')).map((line: string) => line.replace('-', '').trim()) : []

  if (!project) {
    return <div className="w-full flex-1 flex items-center justify-center text-gray-500">{dict.chantier_loading}</div>
  }

  const handleTaskClick = (index: number) => {
    setActiveTab('taches'); 
    setSelectedTaskIndex(index);
  }

  // Fonction pour traduire dynamiquement les statuts
  const getTranslatedStatus = (status: string) => {
    return dict[`status_${status}`] || status.replace('_', ' ');
  }

  return (
    <div className="w-full flex flex-col pt-4 px-6 md:px-8 lg:px-12 pb-12">
      {/* Header Supérieur (Bouton Retour + Onglets) */}
      <div className="grid grid-cols-3 items-center mb-8">
        {/* Colonne 1 (Gauche) */}
        <div className="justify-self-start">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 bg-white hover:bg-gray-50 border border-gray-100 shadow-sm px-4 py-2 rounded-xl transition-all w-fit">
            <ArrowLeft className="w-4 h-4" />
            {dict.chantier_back_to_projects}
          </Link>
        </div>
        {/* Colonne 2 (Centre) */}
        <div className="justify-self-center">
          <div className="bg-gray-100/80 p-1 rounded-xl inline-flex gap-1">
            <button onClick={() => setActiveTab('fiche')} className={`px-4 py-2 text-sm font-medium transition-all rounded-lg ${activeTab === 'fiche' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>
              {dict.chantier_tab_sheet}
            </button>
            <button onClick={() => setActiveTab('taches')} className={`px-4 py-2 text-sm font-medium transition-all rounded-lg ${activeTab === 'taches' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>
              {dict.chantier_tab_tasks}
            </button>
          </div>
        </div>
        {/* Colonne 3 (Droite) */}
        <div className="justify-self-end">
        </div>
      </div>

      {activeTab === 'fiche' && (
        <>
          {/* Header Card */}
          <header className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 ">
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h1 className="text-3xl font-semibold tracking-tighter text-gray-950">
                    {project.name}
                  </h1>
                  <span className="md:hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-white border border-gray-200 shadow-sm text-gray-800 capitalize">
                    <CheckCircle2 className="w-4 h-4 text-gray-500" />
                    {getTranslatedStatus(project.status)}
                  </span>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 shrink-0" /> {project.address || dict.chantier_no_address}
                  </p>
                  {project.address && (
                    <div className="flex flex-wrap items-center gap-3 mt-4">
                      <a href={`https://maps.google.com/?q=${encodeURIComponent(project.address)}`} target="_blank" rel="noopener noreferrer" className="bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                        <Map className="w-4 h-4" /> {dict.chantier_google_maps}
                      </a>
                      <a href={`https://waze.com/ul?q=${encodeURIComponent(project.address)}`} target="_blank" rel="noopener noreferrer" className="bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                        <Navigation className="w-4 h-4" /> {dict.chantier_waze}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <span className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-white border border-gray-200 shadow-sm text-gray-800 capitalize self-start">
                <CheckCircle2 className="w-4 h-4 text-gray-500" />
                {getTranslatedStatus(project.status)}
              </span>
            </div>
          </header>

          {/* Grille de contenu */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne Principale (lg:col-span-2) - L'Opérationnel */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-8 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07)]">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-5 h-5 text-gray-500" />
                <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
                  {dict.chantier_tasks_title}
                </h2>
              </div>
              {tasks.length > 0 ? (
                <div className="space-y-2">
                  {tasks.map((task, index) => (
                    <div
                      key={index}
                      onClick={() => handleTaskClick(index)}
                      className="group flex items-center justify-between p-4 rounded-2xl border border-transparent hover:border-gray-200 hover:bg-gray-50 cursor-pointer transition-all"
                    >
                      <span className="text-gray-700 font-medium">{task}</span>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-600 transition-colors" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">{dict.chantier_no_tasks}</p>
              )}
            </div>

            {/* Colonne Latérale (lg:col-span-1) - L'Administratif */}
            <div className="space-y-6">
              {/* Carte 1: Finances */}
              <div className="rounded-2xl border border-gray-100 p-6 bg-white shadow-sm">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">{dict.chantier_finances_title}</h3>
                <div className="flex items-start gap-3">
                  <Euro className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600">{dict.chantier_total_amount_label}</span>
                    <span className="text-3xl font-semibold tracking-tighter text-gray-900">
                      {total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Carte 2: Informations */}
              <div className="rounded-2xl border border-gray-100 p-6 bg-white shadow-sm">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">{dict.chantier_info_title}</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-gray-600">{dict.chantier_created_date_label}</span>
                      <span className="font-medium text-gray-800">
                        {new Date(project.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-gray-400 shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-gray-600">{dict.chantier_quote_ref_label}</span>
                      <span className="font-mono text-gray-800">{reference}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'taches' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* Colonne de Gauche (Liste des Tâches) */}
          <div className="flex flex-col gap-2 sticky top-28 md:top-32">
            {tasks.map((task: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedTaskIndex(index)}
                className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${selectedTaskIndex === index ? 'bg-white border border-gray-200 shadow-sm text-gray-900' : 'border border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'}`}
              >
                {task}
              </button>
            ))}
          </div>

          {/* Colonne de Droite (Fiche Technique) */}
          <div className="col-span-1 md:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 tracking-tight mb-8">
              {tasks[selectedTaskIndex]}
            </h2>

            {/* Galerie existante */}
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">{dict.chantier_photos_title}</h3>
            <div className="text-center text-gray-400 text-sm py-8 bg-gray-50 rounded-lg">{dict.chantier_no_photos}</div>

            <hr className="border-gray-100 my-8" />

            {/* Section Upload */}
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">{dict.chantier_add_photos_title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-3">
                <span className="text-sm font-medium text-gray-500">{dict.chantier_before_work_label}</span>
                <button className="aspect-video w-full rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-100 hover:border-gray-300 transition-colors">
                  <ImagePlus className="w-8 h-8 mb-2" />
                  <span className="text-sm font-medium">{dict.chantier_add_photo_button}</span>
                </button>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-sm font-medium text-gray-500">{dict.chantier_after_work_label}</span>
                <button className="aspect-video w-full rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-100 hover:border-gray-300 transition-colors">
                  <ImagePlus className="w-8 h-8 mb-2" />
                  <span className="text-sm font-medium">{dict.chantier_add_photo_button}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}