// src/app/login/page.tsx
import { login, signup } from './actions'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>
}) {
  // On "attend" la résolution de la promesse pour lire le message
  const resolvedParams = await searchParams;
  const message = resolvedParams?.message;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <form className="flex flex-col w-full max-w-md gap-4 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Espace Chantier
        </h1>

        {message && (
          <p className="p-4 bg-red-50 text-red-600 text-center text-sm rounded-md mb-4">
            {message}
          </p>
        )}

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
            Prénom
            <input name="first_name" type="text" placeholder="Jean" className="border p-2 rounded-md font-normal" />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
            Nom
            <input name="last_name" type="text" placeholder="Dupont" className="border p-2 rounded-md font-normal" />
          </label>
        </div>

        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700 mt-2">
          Email *
          <input name="email" type="email" required placeholder="jean@exemple.com" className="border p-2 rounded-md font-normal" />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700 mt-2">
          Mot de passe *
          <input name="password" type="password" required className="border p-2 rounded-md font-normal" />
        </label>

        <div className="flex flex-col gap-3 mt-6">
          <button formAction={login} className="bg-blue-600 text-white font-medium p-2.5 rounded-md hover:bg-blue-700 transition-colors">
            Se connecter
          </button>
          <button formAction={signup} className="bg-gray-100 text-gray-800 font-medium p-2.5 rounded-md hover:bg-gray-200 transition-colors border border-gray-200">
            Créer un compte
          </button>
        </div>
      </form>
    </div>
  )
}