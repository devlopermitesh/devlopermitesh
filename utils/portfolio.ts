import 'server-only'

import type { Portfolio } from '@/payload-types'
import { getPayloadClient } from '@/collections/lib/payload'

export async function getPortfolioGlobal(): Promise<Portfolio | null> {
  try {
    const payload = await getPayloadClient()
    const portfolio = await payload.findGlobal({
      slug: 'portfolio',
      depth: 2,
    })

    return portfolio as Portfolio
  } catch (error) {
    console.error('Unable to load portfolio global:', error)
    return null
  }
}
