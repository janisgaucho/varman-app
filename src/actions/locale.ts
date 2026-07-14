'use server'

import { cookies } from 'next/headers';

export async function setLocale(locale: string) {
  try {
    const cookieStore = await cookies(); // Ajout du await, nécessaire dans les versions récentes
    cookieStore.set('NEXT_LOCALE', locale, { 
      maxAge: 60 * 60 * 24 * 365, 
      path: '/',
      httpOnly: true, // Bonne pratique de sécurité
      secure: process.env.NODE_ENV === 'production' // Sécurisé uniquement en prod
    });
    console.log(`[Server Action] Cookie NEXT_LOCALE défini avec succès sur : ${locale}`);
  } catch (error) {
    console.error("[Server Action] Erreur lors de la définition du cookie :", error);
    throw error;
  }
}