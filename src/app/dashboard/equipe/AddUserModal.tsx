'use client'

import { useState } from 'react'
import { useDictionary } from '@/components/DictionaryProvider'
import { addUser } from '@/actions/equipe'
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

export function AddUserModal({ projects }: { projects: Project[] }) {
  const dict = useDictionary()
  const [open, setOpen] = useState(false)

  const handleFormAction = async (formData: FormData) => {
    const result = await addUser(formData)
    if (result?.error) {
      alert(result.error)
    } else {
      setOpen(false) // Ferme la modale en cas de succès
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <button className="bg-[#0071E3] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#0077ED] transition-colors shadow-sm">
          {dict.equipe_bouton_ajouter}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{dict.equipe_modal_titre}</DialogTitle>
          <DialogDescription>{dict.equipe_modal_desc}</DialogDescription>
        </DialogHeader>
        <form action={handleFormAction}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="first_name">{dict.equipe_label_prenom}</Label>
              <input id="first_name" name="first_name" required placeholder={dict.equipe_placeholder_prenom} className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last_name">{dict.equipe_label_nom}</Label>
              <input id="last_name" name="last_name" required placeholder={dict.equipe_placeholder_nom} className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">{dict.equipe_col_email}</Label>
              <input id="email" name="email" type="email" required placeholder={dict.equipe_placeholder_email} className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">{dict.equipe_label_role}</Label>
              <Select name="role" required defaultValue="artisan">
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
          <DialogFooter>
            <button type="submit" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              {dict.equipe_bouton_valider}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}