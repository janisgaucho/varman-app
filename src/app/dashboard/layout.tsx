// src/app/dashboard/layout.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import UserMenu from './UserMenu'
import Link from 'next/link'
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { getDictionary } from '@/lib/dictionary';
import { DictionaryProvider } from '@/components/DictionaryProvider';

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
    .select('first_name, last_name, logo_url, role')
    .eq('id', user.id)
    .single()
  const dict = await getDictionary();
  const firstName = profile?.first_name || dict.header_default_user
  const lastName = profile?.last_name || ''
  const logoUrl = profile?.logo_url || `/logo_structur.png`; // Utilise le logo dynamique ou un logo par défaut
  
  let status = '';
  if (profile?.role === 'maitre_oeuvre') {
    status = dict.role_maitre_oeuvre;
  } else if (profile?.role === 'artisan') {
    status = dict.role_artisan;
  } else if (profile?.role) {
    status = profile.role; // Affiche la valeur brute si elle n'est pas traduite
  }

  return (
    <DictionaryProvider dictionary={dict}>
      <div className="min-h-screen bg-[#F5F5F7] flex flex-col">
        
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-black/4 px-8 md:px-12 flex justify-between items-center">
          <Link href="/dashboard" aria-label={dict.layout_return_to_dashboard_label}>
            <div className="flex items-center">
              <img
                src={logoUrl}
                alt={dict.layout_logo_alt} 
                className="h-20 object-contain"
              />
            </div>
          </Link>

          {/* On appelle notre nouveau Client Component ici */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <div className="w-px h-6 bg-gray-200 hidden sm:block" />
            <UserMenu firstName={firstName} lastName={lastName} status={status} />
          </div>
        </header>

        <main className="flex-1 flex flex-col">
          {children}
        </main>

      </div>
    </DictionaryProvider>
  )
}