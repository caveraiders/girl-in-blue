'use client'
import { useContext, useRef, useState } from 'react'
import Image from 'next/image'
import {
  CheckCircleIcon,
  FunnelIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Sheet from '@/components/Sheet'
import Button from '@/components/Button'
import ScrollArea from '@/components/ScrollArea'
import WeaponFilter from '@/components/WeaponFilter'
import { Weapon, WeaponContextProps } from '@/types/Weapon'
import useInfiniteFrontendPagination from '@/hooks/useInfiniteFrontendPagination'
import WeaponContext from '@/contexts/WeaponContext'

const AddWeapons = () => {
  const {
    weapons,
    weaponTypes,
    weaponElements,
    weaponSeries,
    selectedWeapons,
    setSelectedWeapons,
    openAddWeaponsSheet,
    setOpenAddWeaponsSheet,
  } = useContext<WeaponContextProps>(WeaponContext)

  const initWeapons = weapons.filter(
    (weapon: Weapon) => weapon.items.length > 0,
  )

  const [openFilterSheet, setOpenFilterSheet] = useState<boolean>(false)
  const [filteredWeapons, setFilteredWeapons] = useState<any[]>(initWeapons)

  const rootRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLDivElement>(null)
  const { currentData, hasMoreData } = useInfiniteFrontendPagination(
    filteredWeapons,
    20,
    rootRef,
    targetRef,
  )

  const handleSelectWeapon = (weapon: Weapon) => {
    if (selectedWeapons) {
      if (
        selectedWeapons?.find(
          (selectedWeapon: Weapon) =>
            selectedWeapon.weaponId === weapon.weaponId,
        )
      ) {
        setSelectedWeapons(
          selectedWeapons.filter(
            (selectedWeapon: Weapon) =>
              selectedWeapon.weaponId !== weapon.weaponId,
          ),
        )
      } else {
        setSelectedWeapons([...selectedWeapons, weapon])
      }
    }
  }
  return (
    <>
      <Sheet
        open={openAddWeaponsSheet}
        onOpenChange={setOpenAddWeaponsSheet}
        width="w-full"
        height="h-full"
        zIndex="z-50"
      >
        <div className="flex h-full flex-col">
          <header className="flex items-center justify-between border-b border-slate-100 p-4 dark:border-slate-800 dark:text-slate-300">
            <div className="font-bold">武器の追加</div>
            <Button
              isOnlyIcon
              variant="text"
              appearance="secondary"
              onClick={() => setOpenAddWeaponsSheet(false)}
            >
              <XMarkIcon className="h-5 w-5" />
            </Button>
          </header>
          <div className="flex items-center justify-between px-6 pt-6">
            <div className="text-2xl">武器リスト</div>
            <div className="lg:hidden">
              <Button
                appearance="secondary"
                onClick={() => setOpenFilterSheet(true)}
              >
                <FunnelIcon className="h-4 w-4" />
                絞り込み
              </Button>
            </div>
          </div>
          <div className="flex h-full flex-1 gap-6 overflow-hidden p-6">
            <div className="h-full w-full flex-1" ref={rootRef}>
              <ScrollArea>
                <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-9">
                  {currentData.map((weapon: Weapon, index: number) => {
                    const isSelected = selectedWeapons.some(
                      (selectedWeapon: Weapon) =>
                        selectedWeapon.weaponId === weapon.weaponId,
                    )

                    return (
                      <div
                        key={index}
                        className={`flex cursor-pointer flex-col items-center overflow-hidden rounded-xl border border-slate-300 bg-white shadow active:bg-sky-100 dark:border-slate-700 dark:bg-slate-800 md:hover:border-sky-300 md:dark:hover:border-sky-400
                        ${
                          isSelected
                            ? 'border-sky-300 bg-sky-50 dark:border-sky-700 dark:bg-sky-900/20'
                            : ''
                        }`}
                        onClick={() => handleSelectWeapon(weapon)}
                      >
                        <div className="relative z-0">
                          <Image
                            src={`/images/weapons/m_${weapon.weaponId}.jpg`}
                            width={280}
                            height={160}
                            alt={weapon.jpName}
                          />
                          {isSelected && (
                            <div className="absolute inset-0 z-0 flex items-center justify-center bg-sky-900/50 dark:bg-sky-900/50">
                              <CheckCircleIcon className="h-6 w-6 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="space-y-2 p-4 text-center">
                          <div className="text-xs">{weapon.jpName}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div
                  ref={targetRef}
                  className="pt-10 pb-4 text-center text-sm text-slate-400 dark:text-slate-600"
                >
                  {hasMoreData ? 'もっと読み込む' : 'データがもうありません'}
                </div>
              </ScrollArea>
            </div>
            <div className="hidden h-full w-80 gap-8 overflow-hidden rounded-xl bg-slate-50 ring-1 ring-inset ring-slate-300 dark:bg-slate-800 dark:ring-slate-700 lg:block">
              <ScrollArea>
                <div className="p-6">
                  <WeaponFilter
                    weapons={initWeapons}
                    weaponTypes={weaponTypes}
                    weaponElements={weaponElements}
                    weaponSeries={weaponSeries}
                    onClick={(params: any) =>
                      setFilteredWeapons(params.filteredData)
                    }
                  ></WeaponFilter>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </Sheet>

      <Sheet
        open={openFilterSheet}
        onOpenChange={setOpenFilterSheet}
        width="w-full"
        height="h-5/6"
        zIndex="z-50"
        direction="bottom"
      >
        <div className="flex h-full flex-col">
          <header className="flex items-center justify-between border-b border-slate-100 p-4 dark:border-slate-800 dark:text-slate-300">
            <div className="font-bold">絞り込み</div>
            <Button
              isOnlyIcon
              variant="text"
              appearance="secondary"
              onClick={() => setOpenFilterSheet(false)}
            >
              <XMarkIcon className="h-5 w-5" />
            </Button>
          </header>
          <div className="h-full flex-1 overflow-hidden">
            <ScrollArea>
              <div className="p-6">
                <WeaponFilter
                  weapons={initWeapons}
                  weaponTypes={weaponTypes}
                  weaponElements={weaponElements}
                  weaponSeries={weaponSeries}
                  onClick={(params: any) =>
                    setFilteredWeapons(params.filteredData)
                  }
                ></WeaponFilter>
              </div>
            </ScrollArea>
          </div>
        </div>
      </Sheet>
    </>
  )
}

export default AddWeapons
