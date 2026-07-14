'use client'

import React, { createContext, useContext } from 'react';

// Création du contexte
const DictionaryContext = createContext<any>(null);

// Le Provider qui va englober l'application
export function DictionaryProvider({ 
  dictionary, 
  children 
}: { 
  dictionary: any, 
  children: React.ReactNode 
}) {
  return (
    <DictionaryContext.Provider value={dictionary}>
      {children}
    </DictionaryContext.Provider>
  );
}

// Le Hook magique que l'on utilisera dans nos composants
export function useDictionary() {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error('useDictionary doit être utilisé à l\'intérieur d\'un DictionaryProvider');
  }
  return context;
}