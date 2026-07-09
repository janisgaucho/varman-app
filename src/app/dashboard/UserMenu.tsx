// src/app/dashboard/UserMenu.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function UserMenu({ 
  firstName, 
  lastName, 
  status 
}: { 
  firstName: string; 
  lastName: string; 
  status: string 
}) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const supabase = createClient()

  // Ferme le menu si on clique en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <div className="flex items-center gap-4 relative" ref={menuRef}>
      
      {/* Infos Utilisateur (Maintenant à gauche, texte aligné à droite) */}
      <div className="flex flex-col justify-center text-right">
        <span className="text-sm font-semibold text-[#1D1D1F] leading-tight capitalize">
          {firstName} {lastName}
        </span>
        <span className="text-xs font-medium text-[#86868B] mt-0.5">
          {status}
        </span>
      </div>

      {/* Ligne de séparation */}
      <div className="h-8 w-[1px] bg-gray-200"></div>

      {/* Bouton trois points (Maintenant à droite) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-[#86868B] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="5" cy="12" r="1"></circle>
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="19" cy="12" r="1"></circle>
        </svg>
      </button>

      {/* Le Menu Déroulant */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-black/[0.04] py-1 z-50 overflow-hidden">
          <Link 
            href="/dashboard/compte" 
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 text-sm text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors font-medium"
          >
            Mon compte
          </Link>
          <div className="h-[1px] bg-gray-100 my-1 w-full"></div>
          <button 
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
          >
            Déconnexion
          </button>
        </div>
      )}
    </div>
  )
}