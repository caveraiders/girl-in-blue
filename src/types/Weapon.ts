export type WeaponItem = {
  title: string
  requiredItems: {
    name: string
    requiredAmount: number
  }[]
  type: string
}

export type Weapon = {
  id: number
  weaponId: number
  enName: string
  jpName: string
  gwId: string
  gbfwikiEnId: string
  rarity: string
  element: string
  type: string
  breakLimit: number
  items: WeaponItem[]
  series: string
}
