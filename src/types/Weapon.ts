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

export type WeaponContextProps = {
  weapons: Weapon[]
  weaponTypes: string[]
  weaponElements: string[]
  weaponSeries: string[]
  items: any[]
  selectedWeapons: Weapon[]
  setSelectedWeapons: React.Dispatch<React.SetStateAction<Weapon[]>>
  openAddWeaponsSheet: boolean
  setOpenAddWeaponsSheet: React.Dispatch<React.SetStateAction<boolean>>
}
