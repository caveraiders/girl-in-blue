import { Item } from '@/types/Item'
import { readFile, writeFile } from 'node:fs/promises'

const FILE_PATH = './src/data/items.json'

export const getItems = async (): Promise<Item[]> => {
  try {
    const itemsJson: string = await readFile(FILE_PATH, 'utf8')
    const items: Item[] = JSON.parse(itemsJson)
    return items
  } catch (error: any) {
    console.error(`Error reading items: ${error.message}`)
    throw error
  }
}

export const getItem = async (itemId: string): Promise<Item | undefined> => {
  const items: Item[] = await getItems()
  const item = items?.find((item: Item) => item.itemId === itemId)
  return item
}

export const updateItem = async (itemId: string, updatedFields: string) => {
  try {
    const items: Item[] = await getItems()
    const itemIndex = items.findIndex((item: Item) => item.itemId === itemId)
    const item = items[itemIndex]
    const updatedItem = { ...item, ...JSON.parse(updatedFields) }
    items[itemIndex] = updatedItem
    const json = JSON.stringify(items)
    writeFile(FILE_PATH, json)
    console.log(`Item with ID ${itemId} updated successfully`)
  } catch (err: any) {
    console.error(`Error updating item: ${err.message}`)
  }
}
