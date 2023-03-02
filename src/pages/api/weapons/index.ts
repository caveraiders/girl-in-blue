// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getWeapons } from '@/services/weaponService'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const weapons = await getWeapons()
  res.status(200).json(weapons)
}
