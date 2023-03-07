import WeaponProvider from '@/providers/WeaponProvider'
import { Weapon } from '@/types/Weapon'
import {
  getWeaponElements,
  getWeapons,
  getWeaponSeries,
  getWeaponTypes,
} from '@/api/weapons'
import { getItems } from '@/api/items'
import { Item } from '@/types/Item'
import AddWeapons from '@/app/armory/components/AddWeapons'
import WeaponList from '@/app/armory/components/WeaponList'
import Header from '@/app/armory/components/Header'

export default async function Armory() {
  const weapons: Weapon[] = await getWeapons()
  const weaponTypes: string[] = getWeaponTypes()
  const weaponElements: string[] = getWeaponElements()
  const weaponSeries: string[] = await getWeaponSeries()
  const items: Item[] = await getItems()
  return (
    <WeaponProvider
      value={{
        weapons,
        weaponTypes,
        weaponElements,
        weaponSeries,
        items,
      }}
    >
      <div className="grid grid-cols-1 gap-8">
        <Header />
        <WeaponList />
      </div>
      <AddWeapons />
    </WeaponProvider>
  )
}
