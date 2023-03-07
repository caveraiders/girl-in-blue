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
  const [openAddWeaponsSheet, setOpenAddWeaponsSheet] = useState<boolean>(false)
  return (
    <WeaponContext.Provider
      value={{
        ...value,
        selectedWeapons,
        setSelectedWeapons,
        openAddWeaponsSheet,
        setOpenAddWeaponsSheet,
      }}
    >
      {children}
    </WeaponContext.Provider>
  )
}

export default WeaponProvider
