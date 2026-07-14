// src/app/dashboard/parametres/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client"; // Ajuste ce chemin selon ton projet

export default function SettingsPage() {
  const router = useRouter();
  
  // États pour stocker la prévisualisation visuelle
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);

  // États pour stocker les fichiers physiques à envoyer
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);

  // État de chargement pour le bouton
  const [isSaving, setIsSaving] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const fetchInitialImages = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('logo_url, favicon_url')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error("Erreur lors de la récupération du profil:", error.message);
        return;
      }

      if (profile?.logo_url) setLogoPreview(profile.logo_url);
      if (profile?.favicon_url) setFaviconPreview(profile.favicon_url);
    };
    fetchInitialImages();
  }, []);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFaviconFile(file);
      setFaviconPreview(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = async () => {
    if (!logoFile && !faviconFile) return;
    
    setIsSaving(true);

    try {
      // 1. Récupérer l'utilisateur connecté
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Non autorisé");

      // 2. Gestion du Logo
      if (logoFile) {
        const logoPath = `logos/${user.id}-${Date.now()}`;
        
        // Upload dans le bucket
        const { error: uploadError } = await supabase.storage
          .from('assets_utilisateurs')
          .upload(logoPath, logoFile, { upsert: true });
          
        if (uploadError) throw uploadError;

        // Récupération de l'URL publique et mise à jour de la BDD
        const { data: { publicUrl: logoUrl } } = supabase.storage.from('assets_utilisateurs').getPublicUrl(logoPath);
        await supabase.from('profiles')
          .update({ logo_url: logoUrl })
          .eq('id', user.id);
      }

      // 3. Gestion du Favicon
      if (faviconFile) {
        const faviconPath = `favicons/${user.id}-${Date.now()}`; // Nom de fichier unique
        
        const { error: uploadError } = await supabase.storage
          .from('assets_utilisateurs')
          .upload(faviconPath, faviconFile, { upsert: true });
          
        if (uploadError) throw uploadError;

        const { data: { publicUrl: faviconUrl } } = supabase.storage.from('assets_utilisateurs').getPublicUrl(faviconPath);
        await supabase.from('profiles')
          .update({ favicon_url: faviconUrl })
          .eq('id', user.id);
      }

      // 4. Rafraîchir l'interface et confirmer
      router.refresh();
      alert("Paramètres mis à jour avec succès !");

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur inconnue est survenue.";
      console.error("Erreur détaillée de Supabase :", errorMessage);
      alert(`Une erreur est survenue lors de l'enregistrement.
Détail : ${errorMessage}`);

    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Paramètres de l'espace</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-medium text-gray-900">Personnalisation</h2>
          <p className="mt-1 text-sm text-gray-500">
            Adaptez l'interface aux couleurs de votre entreprise.
          </p>
        </div>

        <div className="p-6 space-y-8">
          
          {/* Upload du Logo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo de l'entreprise
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
              <div className="space-y-4 text-center w-full">
                {logoPreview && (
                  <div className="flex justify-center mb-4">
                    <img src={logoPreview} alt="Aperçu du logo" className="h-20 object-contain" />
                  </div>
                )}
                
                <div className="flex text-sm text-gray-600 justify-center">
                  <label htmlFor="logo-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                    <span>{logoPreview ? "Changer l'image" : "Téléverser un fichier"}</span>
                    <input 
                      id="logo-upload" 
                      name="logo-upload" 
                      type="file" 
                      className="sr-only" 
                      accept="image/png, image/jpeg, image/svg+xml, image/webp" 
                      onChange={handleLogoChange}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, SVG ou WEBP jusqu'à 2MB</p>
              </div>
            </div>
          </div>

          {/* Upload du Favicon */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Favicon (Icône de l'onglet)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
              <div className="space-y-4 text-center w-full">
                {faviconPreview && (
                  <div className="flex justify-center mb-4">
                    <img src={faviconPreview} alt="Aperçu du favicon" className="h-10 w-10 object-contain rounded-md shadow-sm border border-gray-200" />
                  </div>
                )}

                <div className="flex text-sm text-gray-600 justify-center">
                  <label htmlFor="favicon-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                    <span>{faviconPreview ? "Changer l'image" : "Téléverser un fichier"}</span>
                    <input 
                      id="favicon-upload" 
                      name="favicon-upload" 
                      type="file" 
                      className="sr-only" 
                      accept="image/png, image/x-icon, image/webp" 
                      onChange={handleFaviconChange}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">Fichier carré recommandé (PNG, ICO, WEBP).</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button 
              onClick={handleSaveChanges}
              disabled={isSaving || (!logoFile && !faviconFile)}
              className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSaving ? "Enregistrement..." : "Enregistrer les modifications"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}