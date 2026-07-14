// src/app/legal/layout.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import UserMenu from '@/app/dashboard/UserMenu'
import Link from 'next/link'
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { getDictionary } from '@/lib/dictionary';
import { DictionaryProvider } from '@/components/DictionaryProvider';

export default async function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  // Les données utilisateur sont optionnelles sur ces pages
  const profile = user ? (await supabase.from('profiles').select('first_name, last_name').eq('id', user.id).single()).data : null;
  
  const dict = await getDictionary();
  const firstName = profile?.first_name || dict.header_default_user
  const lastName = profile?.last_name || ''
  const status = dict.header_user_status

  return (
    <DictionaryProvider dictionary={dict}>
      <div className="flex flex-col min-h-screen bg-[#F5F5F7]">
        
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-black/4 px-8 md:px-12 py-4 flex justify-between items-center">
          <Link href="/dashboard" aria-label={dict.layout_return_to_dashboard_label}>
            <div className="flex items-center">
              <img 
                src="/logo-varman.webp" 
                alt={dict.layout_logo_alt} 
                className="h-12 object-contain"
              />
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            {user && <div className="w-px h-6 bg-gray-200 hidden sm:block" />}
            {user && <UserMenu firstName={firstName} lastName={lastName} status={status} />}
          </div>
        </header>

        <main className="flex-1">
          {children}
        </main>

      </div>
    </DictionaryProvider>
  )
}