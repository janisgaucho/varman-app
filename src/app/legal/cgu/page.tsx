// src/app/legal/cgu/page.tsx

export default async function CGUPage() {
  return (
    <main className="bg-white">
      <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Conditions générales d'utilisation
          </h1>
          <p className="mt-4 text-lg text-gray-500">Dernière mise à jour : 14 Juillet 2026</p>
        </div>

        <div className="space-y-10">
          
          {/* Section Mentions Légales */}
          <section className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
              Mentions Légales
            </h2>
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p>
                <strong>Éditeur de l'application :</strong> L'application "Structur" est éditée par Janis Botella. Afin de préserver la vie privée de l'éditeur, ses coordonnées personnelles ont été transmises de manière exacte à l'hébergeur Vercel Inc., conformément à l'article 6-III-2 de la loi n° 2004-575 du 21 juin 2004 (LCEN).<br />
                <strong>SIRET :</strong> 88012495300030<br />
                <strong>Contact :</strong> botellajvnis@gmail.com
              </p>
              <p>
                <strong>Directeur de la publication :</strong> Janis Botella.
              </p>
              <p>
                <strong>Hébergement :</strong> L'application est hébergée par la société Vercel Inc., située 340 S Lemon Ave #4133 Walnut, CA 91789, États-Unis.<br />
                Contact hébergeur : privacy@vercel.com / +1 559-288-7060.
              </p>
            </div>
          </section>

          {/* Section Avertissement */}
          <section>
            <div className="bg-gray-100 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                Avertissement – Version Bêta
              </h2>
              <p className="text-gray-700">
                Veuillez noter que l'application "Structur" est actuellement en phase de test expérimental (Bêta). Elle est fournie "en l'état", sans aucune garantie de performance, de fiabilité ou de disponibilité. L'éditeur décline toute responsabilité en cas de bug, d'erreur d'analyse des devis PDF, de perte de données ou de tout autre dommage direct ou indirect résultant de son utilisation. En utilisant ce service, vous reconnaissez et acceptez les risques inhérents à une version non finalisée.
              </p>
            </div>
          </section>

          {/* Section Propriété Intellectuelle */}
          <section>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
              1. Propriété intellectuelle
            </h2>
            <p className="text-gray-600 leading-relaxed">
              L'intégralité de l'application, y compris mais sans s'y limiter, son architecture logicielle, son code source, son design, ses interfaces graphiques, ses bases de données et son contenu textuel, est et demeure la propriété exclusive de Janis Botella.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              L'accès qui vous est fourni constitue une licence d'utilisation temporaire, non exclusive et révocable, accordée uniquement à des fins d'évaluation et de test dans le cadre de cette phase Bêta. Aucune cession de droits de propriété intellectuelle n'est réalisée par le biais des présentes conditions. Toute reproduction, modification, distribution ou décompilation, totale ou partielle, est strictement interdite sans une autorisation écrite préalable.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
              2. Obligations de l'utilisateur
            </h2>
            <p className="text-gray-600 leading-relaxed">
              L'utilisateur s'engage à maintenir la stricte confidentialité de ses identifiants de connexion. Il est seul responsable des actions effectuées sous son compte. L'utilisateur s'interdit d'importer sur la plateforme des documents illicites, frauduleux, ou contenant des codes malveillants susceptibles de compromettre l'intégrité ou la sécurité du système.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
              3. Loi applicable
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Les présentes conditions d'utilisation sont régies et interprétées conformément au droit français. En cas de litige relatif à l'interprétation ou à l'exécution de ces conditions, et à défaut de résolution amiable, les tribunaux français seront seuls compétents.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}