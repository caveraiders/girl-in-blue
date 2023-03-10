'use client'
import WeaponContext from '@/contexts/WeaponContext'
import { useState } from 'react'
import { useLocalStorage } from 'react-use'

type WeaponProviderProps = {
  children: React.ReactNode
  value: any
}

const WeaponProvider = ({ children, value }: WeaponProviderProps) => {
  const [selectedWeapons, setSelectedWeapons] = useLocalStorage<string[]>(
    'selected-weapons',
    [],
  )
  const [myItems, setMyItems] = useLocalStorage<any[]>('my-items', [])
  const [openAddWeaponsSheet, setOpenAddWeaponsSheet] = useState<boolean>(false)
  const [openImpostItemsSheet, setOpenImpostItemsSheet] =
    useState<boolean>(false)
  return (
    <WeaponContext.Provider
      value={{
        ...value,
        selectedWeapons,
        setSelectedWeapons,
        openAddWeaponsSheet,
        setOpenAddWeaponsSheet,
        openImpostItemsSheet,
        setOpenImpostItemsSheet,
        myItems,
        setMyItems,
      }}
    >
      {children}
    </WeaponContext.Provider>
  )
}

export default WeaponProvider
