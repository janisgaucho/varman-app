import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getDictionary } from '@/lib/dictionary'
import { AccountForm } from './AccountForm'

type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  role: string | null;
}

export default async function ComptePage({
  searchParams,
}: {
  searchParams: { message?: string; success_message?: string };
}) {
  const supabase = createClient()
  const dict = await getDictionary()
  
  const { data: { user } } = await supabase.auth.getUser() as any
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const message = searchParams?.message
  const successMessage = searchParams?.success_message

  return (
    <div className="p-8 md:p-12 max-w-3xl mx-auto w-full flex-1">
      {/* En-tête */}
      <div className="mb-10">
        <h1 className="text-[32px] font-semibold tracking-tight text-[#1D1D1F]">
          {dict.account_page_title}
        </h1>
        <p className="text-[#86868B] mt-1 font-medium">
          {dict.account_page_subtitle}
        </p>
      </div>

      {/* Formulaire */}
      <AccountForm
        user={user}
        profile={profile}
        dict={dict}
        message={message}
        successMessage={successMessage}
      />
    </div>
  )
}