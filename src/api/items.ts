import { Item, ItemObtain } from '@/types/Item'

export const getItems = async () => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/items`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error('Request failed with status code ' + response.status)
    }
    const items: Item[] = await response.json()
    return items
  } catch (error) {
    console.error('Error fetching items:', error)
    throw error
  }
}

export const getObtains = async () => {
  const items = await getItems()
  const obtains = items
    .map((item: Item) => item.obtains)
    .flat()
    .map((obtain: any) => obtain.name)
  const uniqueObtains = Array.from(new Set(obtains))
  return uniqueObtains
}
