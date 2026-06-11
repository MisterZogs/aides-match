import { prisma } from 'wasp/server'
import { emailSender } from 'wasp/server/email'
import { matcherAide } from '../../server/lib/matching'

export async function sendAlertes() {
  console.log('[sendAlertes] Démarrage de l\'envoi des alertes')

  const alertes = await prisma.alerte.findMany({
    where: { actif: true },
    include: { user: { select: { email: true } } },
  })

  const aides = await prisma.aide.findMany({ where: { actif: true } })

  for (const alerte of alertes) {
    try {
      const profil = await prisma.entrepriseProfile.findUnique({
        where: { siren: alerte.siren },
      })
      if (!profil || !alerte.user.email) continue

      // Re-matcher toutes les aides actives
      const nouvellesEligibles: string[] = []

      for (const aide of aides) {
        const { score } = matcherAide(profil, aide as any)
        if (score === 'non_eligible') continue

        // Comparer avec le dernier match
        const lastMatch = await prisma.matchResult.findUnique({
          where: { sirenId_aideId: { sirenId: profil.siren, aideId: aide.id } },
        })

        if (!lastMatch) {
          nouvellesEligibles.push(aide.titre)
          await prisma.matchResult.create({
            data: { sirenId: profil.siren, aideId: aide.id, score, detail: { criteresValides: [], criteresEchoues: [], criteresInconnus: [] } },
          })
        }
      }

      if (nouvellesEligibles.length > 0) {
        await emailSender.send({
          to: alerte.user.email,
          subject: `${nouvellesEligibles.length} nouvelle(s) aide(s) pour ${alerte.nom}`,
          text: [
            `Bonjour,\n`,
            `Nous avons détecté ${nouvellesEligibles.length} nouvelle(s) aide(s) potentielle(s) pour votre entreprise "${alerte.nom}" (SIREN ${alerte.siren}) :\n`,
            ...nouvellesEligibles.map((t) => `• ${t}`),
            `\nConsultez votre rapport : https://aides-match.fr/resultats/${alerte.siren}`,
            `\nAidesMatch — Score indicatif, sous réserve de vérification des conditions complètes auprès du porteur de l'aide.`,
          ].join('\n'),
          html: '',
        })

        await prisma.alerte.update({
          where: { id: alerte.id },
          data: { dernierEnvoi: new Date() },
        })
      }
    } catch (err) {
      console.error('[sendAlertes] Erreur pour alerte', alerte.id, err)
    }
  }

  console.log('[sendAlertes] Terminé, alertes traitées :', alertes.length)
}
