import { SiretInput } from '../../aides/components/SiretInput'

export default function Hero() {
  return (
    <div className="relative w-full pt-14">
      <TopGradient />
      <BottomGradient />
      <div className="md:p-12">
        <div className="max-w-8xl mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h1 className="text-foreground text-5xl font-bold sm:text-6xl">
              Votre entreprise est éligible à{' '}
              <span className="text-gradient-primary">des aides publiques</span>
            </h1>
            <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg leading-8">
              Entrez votre SIRET — nous analysons instantanément votre éligibilité à l'ensemble
              des dispositifs nationaux et régionaux : subventions, prêts, garanties, conseils.
            </p>
          </div>

          <SiretInput />

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Gratuit, sans inscription</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Résultats en moins de 30 secondes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Sources officielles uniquement</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TopGradient() {
  return (
    <div
      className="absolute right-0 top-0 -z-10 w-full transform-gpu overflow-hidden blur-3xl sm:top-0"
      aria-hidden="true"
    >
      <div
        className="aspect-1020/880 w-280 flex-none bg-linear-to-tr from-blue-400 to-purple-300 opacity-10 sm:right-1/4 sm:translate-x-1/2 dark:hidden"
        style={{ clipPath: 'polygon(80% 20%, 90% 55%, 50% 100%, 70% 30%, 20% 50%, 50% 0)' }}
      />
    </div>
  )
}

function BottomGradient() {
  return (
    <div
      className="absolute inset-x-0 top-[calc(100%-40rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-65rem)]"
      aria-hidden="true"
    >
      <div
        className="relative aspect-1020/880 w-360 bg-linear-to-br from-blue-400 to-purple-300 opacity-10 sm:-left-3/4 sm:translate-x-1/4 dark:hidden"
        style={{ clipPath: 'ellipse(80% 30% at 80% 50%)' }}
      />
    </div>
  )
}
