// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getItems } from '@/services/itemService'
import { Item } from '@/types/Item'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Item[] | { error: string }>,
) {
  try {
    const items = await getItems()
    if (!items) {
      return res.status(404).json({ error: 'No items found' })
    }
    return res.status(200).json(items)
  } catch (error: any) {
    console.error(error)
    return res.status(500).json({ error: 'Server error' })
  }
}
