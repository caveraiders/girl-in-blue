// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getItem, updateItem } from '@/services/itemService'
import { Item } from '@/types/Item'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const itemId = req.query.itemId as string
  const item = await getItem(itemId)
  switch (req.method) {
    case 'GET':
      res.status(200).json(item)
      break
    case 'PATCH':
      updateItem(itemId, req.body)
      res.status(200).json(req.body)
    default:
      console.log(req.method)
  }
}
