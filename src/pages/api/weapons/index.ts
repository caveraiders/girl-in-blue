// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getWeapons } from '@/services/weaponService'
import { Weapon } from '@/types/Weapon'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Weapon[] | { error: string }>,
) {
  try {
    const weapons = await getWeapons()
    if (!weapons) {
      return res.status(404).json({ error: 'No weapons found' })
    }
    return res.status(200).json(weapons)
  } catch (error: any) {
    console.error(error)
    return res.status(500).json({ error: 'Server error' })
  }
}
