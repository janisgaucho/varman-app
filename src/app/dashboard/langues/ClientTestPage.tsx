'use client'

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Globe, Loader2 } from 'lucide-react';

export default function ClientTestPage({ dict }: { dict: any }) {
  const [textToTranslate, setTextToTranslate] = useState('Bonjour, le chantier avance bien. Les matériaux sont livrés.');
  const [targetLang, setTargetLang] = useState('en');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textToTranslate,
          targetLanguage: targetLang,
        }),
      });

      const data = await response.json();
      
      if (data.translatedText) {
        setTranslatedText(data.translatedText);
      } else {
        setTranslatedText('Erreur: ' + data.error);
      }
    } catch (error) {
      setTranslatedText('Erreur de connexion au serveur.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
            <Globe className="w-5 h-5 text-gray-400"/>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">{dict.test_api}</h1>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{dict.texte_original}</label>
            <textarea 
              className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-gray-400 resize-none h-24 text-sm"
              value={textToTranslate}
              onChange={(e) => setTextToTranslate(e.target.value)}
            />
          </div>

          <div className="flex gap-4 items-center">
            <select 
              value={targetLang} 
              onChange={(e) => setTargetLang(e.target.value)}
              className="p-3 border border-gray-200 rounded-xl bg-white text-sm outline-none cursor-pointer"
            >
              <option value="en">Anglais (en)</option>
              <option value="pt">Portugais (pt)</option>
              <option value="pl">Polonais (pl)</option>
              <option value="ro">Roumain (ro)</option>
            </select>

            <button 
              onClick={handleTranslate}
              disabled={isLoading}
              className="flex items-center justify-center min-w-30 px-5 py-3 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : dict.bouton_traduire}
            </button>
          </div>

          {translatedText && (
            <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Résultat :</span>
              <p className="text-sm text-gray-800">{translatedText}</p>
            </div>
          )}
        </div>

        <hr className="border-gray-100 my-8" />
        
        <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2"/> {dict.retour}
        </Link>
      </div>
    </div>
  );
}