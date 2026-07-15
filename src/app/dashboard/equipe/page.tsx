// import { getDictionary } from '@/lib/dictionary'
// import { getEquipe, getProjects } from '@/actions/equipe'
// import { AddUserModal } from './AddUserModal'
import EquipePageWrapper from './EquipePageWrapper'
// import { EditUserModal } from './EditUserModal'

import { Metadata } from 'next'
export const metadata: Metadata = {
  title: "Gestion d'équipe",
};

export default async function EquipePage() {
  // const dict = await getDictionary()
  // const users = await getEquipe()
  // const projects = await getProjects()
  // console.log("🔍 Données brutes reçues de Supabase :", JSON.stringify(users, null, 2));

  return (
    <EquipePageWrapper>
      <div className="flex h-[calc(100vh-10rem)] w-full items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-500">Cette page est en cours de développement</h1>
      </div>
    </EquipePageWrapper>
  );
}