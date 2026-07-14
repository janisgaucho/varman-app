import { getDictionary } from '@/lib/dictionary';
import ClientTestPage from './ClientTestPage';

export default async function LanguesPage() {
  // Lecture du cookie et récupération du bon JSON côté serveur
  const dict = await getDictionary();

  // On passe le dictionnaire au composant client
  return <ClientTestPage dict={dict} />;
}