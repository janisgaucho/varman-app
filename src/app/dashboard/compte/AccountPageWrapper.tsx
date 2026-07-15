'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function AccountPageWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className="relative w-full min-h-screen bg-gray-50 pt-8 pb-12">
      <button
        onClick={() => router.back()}
        className="absolute left-4 sm:left-6 lg:left-8 top-8 flex items-center gap-2 text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors px-3 py-2 rounded-md cursor-pointer w-fit z-10"
        aria-label="Retour à la page précédente"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Retour</span>
      </button>
      {children}
    </div>
  );
}