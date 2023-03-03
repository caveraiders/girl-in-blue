import { Item } from '@/types/Item'

export const getItems = async () => {
  const response = await fetch('http://localhost:3000/api/items')
  const items: Item[] = await response.json()
  return items
}

export const getItem = async (itemId: string) => {
  const response = await fetch(`http://localhost:3000/api/items/${itemId}`)
  const item: Item = await response.json()
  return item
}

export const updateItem = async (itemId: string, updatedFields: Item) => {
  const response = await fetch(`http://localhost:3000/api/items/${itemId}`, {
    method: 'PATCH',
    body: JSON.stringify(updatedFields),
  })
  const item = response.json()
  return item
}

export const getObtains = async () => {
  const items = await getItems()
  const obtains = items
    .map((item) => item.obtains)
    .flat()
    .map((obtain: any) => obtain.name)

  const uniqueObtains = Array.from(new Set(obtains))
  return uniqueObtains
}
