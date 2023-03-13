import { Weapon } from '@/types/Weapon'
import { readFile } from 'fs/promises'

const FILE_PATH = './src/data/weapons.json'

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

export const getWeapon = async (weaponId: number): Promise<Weapon> => {
  const weapons = await getWeapons()
  const weapon = weapons.find((weapon: Weapon) => weapon.weaponId === weaponId)
  return weapon
}
