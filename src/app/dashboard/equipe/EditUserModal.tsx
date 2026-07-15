'use client'

import { useState } from 'react'
import { useDictionary } from '@/components/DictionaryProvider'
import { updateUser, deleteUser } from '@/actions/equipe'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Project = {
  id: string;
  name: string;
};

type User = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  role: string | null;
};

export function EditUserModal({ user, projects }: { user: User, projects: Project[] }) {
  const dict = useDictionary()
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleFormAction = async (formData: FormData) => {
    const result = await updateUser(user.id, formData)
    if (result?.error) {
      alert(result.error)
    } else {
      setOpen(false) // Ferme la modale en cas de succès
    }
  }

  const handleDelete = async () => {
    if (confirm(dict.equipe_confirm_delete || "Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.")) {
      setIsDeleting(true);
      const result = await deleteUser(user.id);
      if (result?.error) {
        alert(result.error);
      } else {
        setOpen(false); // Ferme la modale en cas de succès
      }
      setIsDeleting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
          {dict.equipe_bouton_modifier || 'Modifier'}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{dict.equipe_modal_titre_modifier || "Modifier l'utilisateur"}</DialogTitle>
          <DialogDescription>{dict.equipe_modal_desc_modifier || "Mettez à jour les informations de l'utilisateur."}</DialogDescription>
        </DialogHeader>
        <form action={handleFormAction}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="first_name">{dict.equipe_label_prenom}</Label>
              <input id="first_name" name="first_name" required defaultValue={user.first_name || ''} className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last_name">{dict.equipe_label_nom}</Label>
              <input id="last_name" name="last_name" required defaultValue={user.last_name || ''} className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">{dict.equipe_col_email}</Label>
              <input id="email" name="email" type="email" required defaultValue={user.email || ''} className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">{dict.equipe_label_role}</Label>
              <Select name="role" required defaultValue={user.role || 'artisan'}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={dict.equipe_label_role} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="artisan">{dict.equipe_role_artisan}</SelectItem>
                  <SelectItem value="maitre_oeuvre">{dict.equipe_role_moe}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project_id">{dict.equipe_label_chantier}</Label>
              <Select name="project_id">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={dict.equipe_placeholder_chantier} />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-between sm:items-center w-full">
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors disabled:text-gray-400 disabled:cursor-not-allowed mt-2 sm:mt-0"
            >
              {isDeleting ? (dict.equipe_bouton_suppression_en_cours || 'Suppression...') : (dict.equipe_bouton_supprimer || 'Supprimer')}
            </button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              {dict.equipe_bouton_valider_modification || 'Enregistrer les modifications'}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}