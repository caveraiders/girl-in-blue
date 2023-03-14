import WeaponProvider from '@/providers/WeaponProvider'
import { Weapon } from '@/types/Weapon'
import { Item } from '@/types/Item'
import AddWeapons from '@/app/armory/components/AddWeapons'
import WeaponList from '@/app/armory/components/WeaponList'
import Header from '@/app/armory/components/Header'
import ImpostItems from '@/app/armory/components/ImpostItems'
import {
  getWeaponElements,
  getWeapons,
  getWeaponSeries,
  getWeaponTypes,
} from '@/services/weaponService'
import { getItems } from '@/services/itemService'

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
      <div className="grid grid-cols-1 gap-4">
        <Header />
        <WeaponList />
      </div>
      <AddWeapons />
      <ImpostItems />
    </WeaponProvider>
  )
}
