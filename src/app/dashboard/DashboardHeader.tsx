'use client'

type Profile = {
  first_name: string | null
  last_name: string | null
} | null

export default function DashboardHeader({ profile }: { profile: Profile }) {
  const firstName = profile?.first_name || 'Utilisateur'
  const lastName = profile?.last_name || ''
  
  // Statut par défaut, pourra être dynamisé plus tard
  const status = "Maître d'œuvre"

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-black/[0.04] px-8 md:px-12 py-4 flex justify-between items-center">
      
      {/* Gauche : Logo */}
      <div className="flex items-center">
        <img 
          src="/logo-varman.webp" 
          alt="Logo" 
          className="h-12 object-contain"
        />
      </div>

      {/* Droite : Menu & Utilisateur */}
      <div className="flex items-center gap-4">
        
        {/* Bouton de menu (pourrait ouvrir un menu de déconnexion, etc.) */}
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-[#86868B] cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="5" cy="12" r="1"></circle>
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
          </svg>
        </button>

        <div className="h-8 w-[1px] bg-gray-200"></div>

        <div className="flex flex-col justify-center">
          <span className="text-sm font-semibold text-[#1D1D1F] leading-tight capitalize">
            {firstName} {lastName}
          </span>
          <span className="text-xs font-medium text-[#86868B] mt-0.5">
            {status}
          </span>
        </div>

      </div>
    </header>
  )
}