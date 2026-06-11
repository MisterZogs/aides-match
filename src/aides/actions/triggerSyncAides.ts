import type { TriggerSyncAides } from 'wasp/server/operations'
import { syncAides } from '../jobs/syncAides'

export const triggerSyncAides: TriggerSyncAides<void, { ok: boolean }> = async () => {
  await syncAides()
  return { ok: true }
}
