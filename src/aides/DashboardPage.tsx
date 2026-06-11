import { useQuery, getAlertes, deleteAlerte } from 'wasp/client/operations'
import { useAuth } from 'wasp/client/auth'
import { Link } from 'react-router'

export default function DashboardPage() {
  const { data: user } = useAuth()
  const { data: alertes, isLoading, refetch } = useQuery(getAlertes)

  const isPro = ['pro', 'agency'].includes(user?.subscriptionPlan ?? '')

  async function handleDelete(id: string) {
    await deleteAlerte({ id })
    refetch()
  }

  if (!isPro) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600">
            Les alertes et le tableau de bord sont réservés aux abonnés Pro et Agency.
          </p>
          <Link
            to="/pricing"
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Découvrir les offres
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Mes alertes</h1>
          <Link
            to="/"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            + Nouvelle recherche
          </Link>
        </div>

        {isLoading && (
          <div className="text-gray-500 text-center py-12">Chargement…</div>
        )}

        {!isLoading && alertes?.length === 0 && (
          <div className="rounded-xl border-2 border-dashed border-gray-200 p-12 text-center text-gray-500">
            <p className="mb-3">Aucune alerte configurée.</p>
            <p className="text-sm">
              Après une recherche SIRET, vous pouvez créer une alerte pour être notifié chaque mois
              des nouvelles aides.
            </p>
          </div>
        )}

        <div className="space-y-4">
          {alertes?.map((alerte) => (
            <div key={alerte.id} className="rounded-xl border bg-white p-5 shadow-sm flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-gray-900">{alerte.nom}</p>
                <p className="text-sm text-gray-500">SIREN {alerte.siren}</p>
                {alerte.dernierEnvoi && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    Dernière alerte : {new Date(alerte.dernierEnvoi).toLocaleDateString('fr-FR')}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  to={`/resultats/${alerte.siren}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Voir les aides
                </Link>
                <button
                  onClick={() => handleDelete(alerte.id)}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
