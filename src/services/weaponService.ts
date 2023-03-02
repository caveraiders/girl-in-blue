import { Weapon } from '@/types/Weapon'
import { readFile } from 'fs/promises'

const FILE_PATH = './src/data/weapons.json'

export const getWeapons = async () => {
  const weapons = await readFile(FILE_PATH, 'utf8')
  return weapons ? JSON.parse(weapons) : []
}

export const getWeapon = async (weaponId: number): Promise<Weapon> => {
  const weapons = await getWeapons()
  const weapon = weapons.find((weapon: Weapon) => weapon.weaponId === weaponId)
  return weapon
}
