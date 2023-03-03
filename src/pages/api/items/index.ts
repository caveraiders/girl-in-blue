// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getItems, updateItem } from '@/services/itemService'
import { Item } from '@/types/Item'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const items = await getItems()
  res.status(200).json(items)
}
