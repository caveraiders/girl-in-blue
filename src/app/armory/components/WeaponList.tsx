'use client'
import Image from 'next/image'
import Link from 'next/link'
import StarRating from '@/components/StarRating'
import * as Tabs from '@radix-ui/react-tabs'
import Button from '@/components/Button'
import { useContext } from 'react'
import { Weapon, WeaponContextProps } from '@/types/Weapon'
import WeaponContext from '@/contexts/WeaponContext'

const convertToShortString = (num: number): string => {
  if (num >= 999) {
    return '999+'
  } else {
    return num.toString()
  }
}

type OtherSiteProps = {
  link: string
  name: string
  icon: string
  isDisabled: boolean
}

const OtherSite = ({ link, name, icon, isDisabled }: OtherSiteProps) => (
  <Link href={link} target="_blank">
    <Button
      appearance="secondary"
      variant="outlined"
      size="sm"
      isDisabled={isDisabled}
    >
      <Image
        src={icon}
        width={16}
        height={16}
        alt={name}
        className="rounded-full"
      />
      {name}
    </Button>
  </Link>
)

const WeaponList = () => {
  const { items, selectedWeapons, setSelectedWeapons } =
    useContext<WeaponContextProps>(WeaponContext)
  return (
    <div className="grid grid-cols-1 gap-4 rounded-b-xl md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {selectedWeapons?.map((weapon: Weapon, weaponIndex: number) => (
        <div
          key={weaponIndex}
          className="flex flex-col gap-6 overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="flex flex-wrap gap-4">
            <Image
              src={`/images/weapons/m_${weapon.weaponId}.jpg`}
              width={140}
              height={80}
              alt={weapon.jpName}
              className="h-20 w-auto"
            />
            <div className="flex flex-col gap-2">
              <div>
                <span className="rounded bg-sky-50 px-1.5 py-0.5 text-xs text-sky-500 ring-1 ring-sky-200 dark:bg-sky-900/50 dark:text-sky-200/80 dark:ring-sky-900/80">
                  {weapon.series}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1 font-bold">
                  {weapon.jpName}
                </div>
              </div>
              <StarRating breakLimit={weapon.breakLimit} />
            </div>
            <div className="flex items-center gap-2">
              <OtherSite
                link={`https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/${weapon.gwId}`}
                name="Gamewith"
                icon="/images/logos/gamewith.webp"
                isDisabled={weapon.gwId === ''}
              />
              <OtherSite
                link={`https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/%E6%AD%A6%E5%99%A8/SSR/${weapon.jpName}.html`}
                name="Kamigame"
                icon="/images/logos/kamigame.png"
                isDisabled={weapon.jpName === ''}
              />
              <OtherSite
                link={`https://gbf.huijiwiki.com/wiki/Weapon/${weapon.gbfwikiEnId}`}
                name="GBF Wiki"
                icon="/images/logos/gbfwiki_en.png"
                isDisabled={weapon.gbfwikiEnId === ''}
              />
            </div>
          </div>

          <div>
            <Tabs.Root defaultValue={weapon.items[0].title} className="w-full">
              <Tabs.List
                className={`mb-4 grid grid-cols-${weapon.items.length}`}
              >
                {weapon.items.map((item, itemIndex) => (
                  <Tabs.Trigger
                    value={item.title}
                    key={itemIndex}
                    className="flex h-11 items-center justify-center gap-2 border-b border-slate-300 px-5 data-[state=active]:border-sky-400 data-[state=active]:text-sky-400 dark:border-slate-700 data-[state=active]:dark:border-sky-400"
                  >
                    {item.title}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
              {weapon.items.map((item, itemIndex) => (
                <Tabs.Content key={itemIndex} value={item.title}>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2">
                    {item.requiredItems.map(
                      (requiredItem, requiredItemIndex) => {
                        const itemId = items.find(
                          (itemsItem) => itemsItem.name === requiredItem.name,
                        )?.itemId
                        return (
                          <div
                            key={requiredItemIndex}
                            className="flex cursor-pointer gap-2 rounded border border-slate-200 bg-slate-50 p-2 hover:border-sky-400 dark:border-slate-600 dark:bg-slate-700 hover:dark:border-sky-400"
                          >
                            <div>
                              <Image
                                src={
                                  itemId
                                    ? `/images/items/s_${itemId}.jpg`
                                    : `/images/items/default.jpg`
                                }
                                width={56}
                                height={56}
                                alt={weapon.jpName}
                              />
                            </div>
                            <div className="flex w-full flex-1 flex-col divide-y divide-dashed divide-slate-200 text-xs dark:divide-slate-600">
                              <div className="pb-0.5 font-bold text-yellow-500">
                                {requiredItem.name}
                              </div>
                              <div className="flex items-center justify-between py-0.5">
                                <span>必要数</span>
                                <span className="slashed-zero proportional-nums">
                                  {convertToShortString(
                                    requiredItem.requiredAmount,
                                  )}
                                </span>
                              </div>
                              <div className="flex items-center justify-between pt-0.5">
                                <span>所持数</span>
                                <span className="slashed-zero proportional-nums">
                                  {convertToShortString(22222222222)}
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      },
                    )}
                  </div>
                </Tabs.Content>
              ))}
            </Tabs.Root>
          </div>
        </div>
      ))}
    </div>
  )
}

export default WeaponList
