import { getItems } from '@/api/items'
import {
  getWeaponElements,
  getWeapons,
  getWeaponSeries,
  getWeaponTypes,
} from '@/api/weapons'
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
