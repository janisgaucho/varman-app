// src/app/legal/confidentialite/page.tsx

export default async function ConfidentialitePage() {
  return (
    <main className="bg-white">
      <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Politique de confidentialité
          </h1>
          <p className="mt-4 text-lg text-gray-500">Dernière mise à jour : 14 Juillet 2026</p>
          <p className="mt-2 text-sm text-gray-500">Le responsable du traitement des données est Janis Botella.</p>
        </div>

        <div className="space-y-10">
          {/* Section Données Collectées */}
          <section>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
              1. Données collectées, finalité et base légale
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Dans le cadre de l'utilisation de l'application, nous collectons les données suivantes sur la base de l'exécution des Conditions Générales d'Utilisation :
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>
                <strong>Données de connexion :</strong> Votre adresse e-mail est utilisée comme identifiant unique pour la création, la sécurisation et la gestion de votre compte utilisateur.
              </li>
              <li>
                <strong>Données d'exploitation :</strong> Les informations que vous fournissez (adresses de chantiers, noms de clients, fichiers PDF de devis importés) sont traitées dans le but exclusif de fournir la fonctionnalité principale de l'application : l'analyse, l'automatisation et la gestion de vos chantiers.
              </li>
            </ul>
          </section>

          {/* Section Durée de conservation */}
          <section>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
              2. Durée de conservation
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Vos données de connexion et d'exploitation sont conservées pendant toute la durée d'existence de votre compte. En cas de demande de suppression du compte, toutes les données associées (y compris les chantiers et les devis PDF) sont définitivement effacées de nos serveurs, sous réserve de nos obligations légales de conservation.
            </p>
          </section>

          {/* Section Sous-traitance & Hébergement */}
          <section>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
              3. Sous-traitance et hébergement
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Pour fournir un service fiable et sécurisé, nous nous appuyons sur des partenaires techniques de premier plan :
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mt-4">
              <li>
                <strong>Déploiement et hébergement :</strong> L'application est déployée via la société <strong>Vercel Inc.</strong>
              </li>
              <li>
                <strong>Base de données et stockage :</strong> Vos données et fichiers sont stockés de manière sécurisée sur l'infrastructure opérée par <strong>Supabase Inc.</strong>. Les serveurs utilisés pour ce stockage sont localisés au sein de l'Union Européenne.
              </li>
            </ul>
          </section>

          {/* Section Droits des utilisateurs */}
          <section>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
              4. Vos droits
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants concernant vos informations :
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mt-4">
              <li>
                <strong>Droit d'accès et de portabilité :</strong> Vous pouvez demander à consulter ou récupérer les données que nous détenons sur vous.
              </li>
              <li>
                <strong>Droit de rectification :</strong> Vous pouvez modifier les informations de votre profil directement depuis votre espace "Mon Compte".
              </li>
              <li>
                <strong>Droit à l'effacement :</strong> Vous pouvez demander la suppression complète de votre compte et des données associées.
              </li>
              <li>
                <strong>Droit de réclamation :</strong> Vous avez le droit d'introduire une réclamation auprès de la CNIL (cnil.fr) si vous estimez que le traitement de vos données n'est pas conforme.
              </li>
            </ul>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Pour toute question ou pour exercer vos droits, veuillez nous contacter à l'adresse suivante : botellajvnis@gmail.com.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
