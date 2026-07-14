// src/app/dashboard/nouveau/FileUploader.tsx
'use client'

import { useState } from 'react'
import { useDictionary } from '@/components/DictionaryProvider'

export default function FileUploader() {
  const [fileName, setFileName] = useState<string | null>(null)
  const dict = useDictionary()
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
    } else {
      setFileName(null)
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-40 p-4 border-2 border-dashed rounded-[24px] border-gray-200 bg-[#F5F5F7]/50 hover:bg-[#F5F5F7] transition-colors group overflow-hidden">
      
      {/* L'input invisible qui gère le vrai upload */}
      <input
        type="file"
        name="devis"
        accept="application/pdf"
        required
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />

      {/* Le retour visuel (UI) */}
      <div className="flex flex-col items-center justify-center pointer-events-none text-center">
        {fileName ? (
          <>
            <div className="w-14 h-14 bg-[#0071E3]/10 text-[#0071E3] rounded-full flex items-center justify-center mb-3">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-base font-semibold text-[#1D1D1F] truncate max-w-xs">{fileName}</p>
            <p className="text-sm font-medium text-[#0071E3] mt-2">{dict.nouveau_file_uploader_ready}</p>
          </>
        ) : (
          <>
            <div className="w-14 h-14 bg-white shadow-sm border border-black/[0.04] text-[#86868B] rounded-full flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-base font-semibold text-[#1D1D1F]">{dict.nouveau_file_uploader_drag_drop}</p>
            <p className="text-sm font-medium text-[#86868B] mt-1">{dict.nouveau_file_uploader_browse}</p>
          </>
        )}
      </div>
    </div>
  )
}