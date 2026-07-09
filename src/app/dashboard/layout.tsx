// src/app/dashboard/layout.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import UserMenu from './UserMenu'
import Link from 'next/link'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('first_name, last_name')
    .eq('id', user.id)
    .single()

  const firstName = profile?.first_name || 'Utilisateur'
  const lastName = profile?.last_name || ''
  const status = "Maître d'œuvre"

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col">
      
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-black/[0.04] px-8 md:px-12 py-4 flex justify-between items-center">
        <Link href="/dashboard" aria-label="Retour à l'accueil du tableau de bord">
          <div className="flex items-center">
            <img 
              src="/logo-varman.webp" 
              alt="Logo Varman" 
              className="h-12 object-contain"
            />
          </div>
        </Link>

        {/* On appelle notre nouveau Client Component ici */}
        <UserMenu firstName={firstName} lastName={lastName} status={status} />
      </header>

      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  )
}