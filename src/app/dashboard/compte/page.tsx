import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getDictionary } from '@/lib/dictionary'
import { AccountForm } from './AccountForm'
import { Metadata } from 'next';
import AccountPageWrapper from './AccountPageWrapper';

type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  role: string | null;
};

export const metadata: Metadata = {
  title: "Mon compte",
};

export default async function ComptePage({
  searchParams,
}: {
  searchParams: { message?: string; success_message?: string };
}) {
  const supabase = createClient();
  const dict = await getDictionary();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const message = searchParams?.message;
  const successMessage = searchParams?.success_message;

  return (
    <AccountPageWrapper>
      <div className="w-full max-w-4xl mx-auto px-4 flex flex-col">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 text-left mb-1">
            {dict.account_page_title}
          </h1>
          <p className="text-gray-500 text-left mb-8">
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
    </AccountPageWrapper>
  );
}