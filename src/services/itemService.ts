import { Item } from '@/types/Item'
import { readFile } from 'node:fs/promises'
import path from 'path'

const jsonDirectory = path.join(process.cwd(), 'src/data')
const FILE_PATH = `${jsonDirectory}/items.json`

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
