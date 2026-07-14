import { getDictionary } from '@/lib/dictionary'
import { getEquipe, getProjects } from '@/actions/equipe'
import { AddUserModal } from './AddUserModal'
import { DeleteUserButton } from './DeleteUserButton'

export default async function EquipePage() {
  const dict = await getDictionary()
  const users = await getEquipe()
  const projects = await getProjects()
  // console.log("🔍 Données brutes reçues de Supabase :", JSON.stringify(users, null, 2));

  return (
    <div className="flex-1 flex items-center justify-center text-center">
      <p className="text-gray-500">Cette page est en cours de développement.</p>
    </div>
  );
}