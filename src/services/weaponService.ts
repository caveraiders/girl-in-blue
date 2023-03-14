import { Weapon } from '@/types/Weapon'
import { readFile } from 'fs/promises'
import path from 'path'

const jsonDirectory = path.join(process.cwd(), 'src/data')
const FILE_PATH = `${jsonDirectory}/weapons.json`

export const getWeaponElements = (): string[] => {
  const elements: string[] = ['火', '水', '土', '風', '光', '闇']
  return elements
}

export const getWeaponTypes = (): string[] => {
  const types: string[] = [
    '剣',
    '短剣',
    '槍',
    '斧',
    '杖',
    '銃',
    '格闘',
    '弓',
    '楽器',
    '刀',
  ]
  return types
}

export const getWeapons = async () => {
  try {
    const weaponsJson = await readFile(FILE_PATH, 'utf8')
    const weapons = JSON.parse(weaponsJson)
    return weapons
  } catch (error: any) {
    console.error(`Error reading weapons: ${error.message}`)
    throw error
  }
}

export const getWeaponSeries = async (): Promise<string[]> => {
  const weapons: Weapon[] = await getWeapons()
  const series: string[] = Array.from(
    new Set(weapons.map((weapon: Weapon) => weapon.series)),
  )
  return series
}
