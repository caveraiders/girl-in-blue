import { getItems } from '@/services/itemService'
import {
  getWeaponElements,
  getWeapons,
  getWeaponSeries,
  getWeaponTypes,
} from '@/services/weaponService'

import WeaponsTable from './components/WeaponsTable'

const Weapons = async () => {
  const weapons = await getWeapons()
  const weaponSeries = await getWeaponSeries()
  const weaponTypes = getWeaponTypes()
  const weaponElements = getWeaponElements()
  const items = await getItems()
  return (
    <WeaponsTable
      weapons={weapons}
      weaponSeries={weaponSeries}
      weaponTypes={weaponTypes}
      weaponElements={weaponElements}
      itemList={items}
    />
  )
}
export default Weapons
