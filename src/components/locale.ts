'use server'

import { cookies } from 'next/headers';

export async function setLocale(locale: string) {
  console.log(`[Server Action] Tentative d'écriture du cookie NEXT_LOCALE : ${locale}`);
  // Le cookie expirera dans 1 an
  (await cookies()).set('NEXT_LOCALE', locale, { maxAge: 60 * 60 * 24 * 365, path: '/' });
  console.log(`[Server Action] Cookie NEXT_LOCALE configuré avec succès sur : ${locale}`);
}