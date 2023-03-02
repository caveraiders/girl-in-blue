import { Weapon } from '@/types/Weapon'

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
  const response = await fetch('http://localhost:3000/api/weapons')
  const items: Weapon[] = await response.json()
  return items
}

export const getWeaponSeries = async (): Promise<string[]> => {
  const weapons: Weapon[] = await getWeapons()
  const series: string[] = Array.from(
    new Set(weapons.map((weapon: Weapon) => weapon.series)),
  )
  return series
}
