// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getWeapon } from '@/services/weaponService'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const weaponId = req.query.id
  const weapon = getWeapon(Number(weaponId))
  res.status(200).json(weapon)
}
