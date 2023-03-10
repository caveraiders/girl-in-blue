'use client'
import { WeaponContextProps } from '@/types/Weapon'
import { Context, createContext } from 'react'

const WeaponContext: Context<WeaponContextProps> =
  createContext<WeaponContextProps>({
    weapons: [],
    weaponTypes: [],
    weaponElements: [],
    weaponSeries: [],
    items: [],
    selectedWeapons: [],
    setSelectedWeapons: () => {},
    openAddWeaponsSheet: false,
    setOpenAddWeaponsSheet: () => {},
    openImpostItemsSheet: false,
    setOpenImpostItemsSheet: () => {},
    myItems: [],
    setMyItems: () => {},
  })

export default WeaponContext
