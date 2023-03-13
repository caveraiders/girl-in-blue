'use client'
import Image from 'next/image'
import { Weapon } from '@/types/Weapon'
import Button from '@/components/Button'
import { ArrowUpTrayIcon, FunnelIcon } from '@heroicons/react/24/solid'
import { useContext, useEffect, useState } from 'react'
import Sheet, { SheetHeader } from '@/components/Sheet'
import ScrollArea from '@/components/ScrollArea'
import WeaponDetail from '../WeaponDetail'
import usePagination from '@/hooks/usePagination'
import Pagination from '@/components/Pagination'
import WeaponFilter from '@/components/WeaponFilter'
import { Item } from '@/types/Item'
import StarRating from '@/components/StarRating'
import useExportExcel from '@/hooks/useExportExcel'
import ToastContext from '@/contexts/ToastContext'
import OtherSite from './OtherSite'

const groupName = {
  格闘: 'melee',
  杖: 'staff',
  短剣: 'dagger',
  斧: 'axe',
  槍: 'spear',
  刀: 'katana',
  剣: 'sabre',
  楽器: 'harp',
  銃: 'gun',
  弓: 'bow',
  素材: 'boost',
} as any

type WeaponTableProps = {
  weapons: Weapon[]
  weaponSeries: string[]
  weaponTypes: string[]
  weaponElements: string[]
  itemList: Item[]
}

const Container = ({ children }: any) => (
  <>
    <div
      className="hidden flex-col overflow-hidden lg:flex"
      style={{ height: 'calc(100vh - 32px)' }}
    >
      {children}
    </div>
    <div className="flex flex-col lg:hidden">{children}</div>
  </>
)

const WeaponsCard = ({
  weapon,
  onClick = (f: any) => f,
}: {
  weapon: Weapon
  onClick: Function
}) => {
  return (
    <div className="flex flex-wrap gap-4">
      <Image
        src={`/images/weapons/m_${weapon.weaponId}.jpg`}
        width={140}
        height={80}
        alt={weapon.jpName}
        className="h-20 w-auto"
        onClick={() => {
          onClick()
        }}
      />
      <div className="flex flex-1 flex-col gap-2">
        {weapon.series && (
          <div>
            <span className="rounded bg-sky-50 px-1.5 py-0.5 text-xs text-sky-500 ring-1 ring-sky-200 dark:bg-sky-900/50 dark:text-sky-200/80 dark:ring-sky-900/80">
              {weapon.series}
            </span>
          </div>
        )}
        <div>
          <div
            className="flex items-center gap-1 font-bold"
            onClick={() => {
              onClick()
            }}
          >
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
  )
}

const itemsPerPage = 30
const WeaponsTable = ({
  weapons,
  weaponSeries,
  weaponTypes,
  weaponElements,
  itemList,
}: WeaponTableProps) => {
  const { setToast } = useContext(ToastContext)
  const [openSheet, setOpenSheet] = useState<boolean>(false)
  const [openFilterSheet, setOpenFilterSheet] = useState<boolean>(false)
  const [currentWeapon, setCurrentWeapon] = useState<any>({})
  const [filteredWeapons, setFilteredWeapons] = useState(weapons)
  const totalItems = filteredWeapons.length ? filteredWeapons.length : 0
  const {
    currentPageIndex,
    totalPages,
    goToPageIndex,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
  } = usePagination({ pageSize: itemsPerPage, totalItems })

  const startIndex = (currentPageIndex - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  useEffect(() => {
    goToFirstPage()
  }, [filteredWeapons])

  const { exporting, handleExport } = useExportExcel()
  const exportExcel = () => {
    handleExport(filteredWeapons, 'weapons.xlsx')
  }

  return (
    <Container>
      <div className="mb-4 flex flex-wrap justify-between gap-4">
        <div className="text-2xl">武器リスト</div>
        <div className="flex items-center justify-center gap-4 sm:justify-start">
          <Button
            appearance="secondary"
            onClick={() => {
              exportExcel()
              setToast({
                isOpen: true,
                title: '导出成功',
                description: '文件已导出成功，你可以在电脑硬盘中找到这个文件。',
              })
            }}
            isDisabled={exporting}
          >
            <ArrowUpTrayIcon className="h-4 w-4" />
            Export
          </Button>

          <div className="xl:hidden">
            <Button
              appearance="secondary"
              onClick={() => setOpenFilterSheet(!openFilterSheet)}
            >
              <FunnelIcon className="h-4 w-4" />
              絞り込み
            </Button>
          </div>
        </div>
      </div>

      <div className="hidden h-full flex-1 gap-4 overflow-hidden lg:flex">
        <div className="h-full w-full flex-1 overflow-hidden overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
          <ScrollArea>
            <table className="relative w-full table-auto border-collapse text-left">
              <thead className="sticky top-0 bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="whitespace-nowrap px-6 py-3 uppercase dark:border-slate-700">
                    #
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 uppercase dark:border-slate-700">
                    名称
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 uppercase dark:border-slate-700">
                    武器ID
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 uppercase dark:border-slate-700">
                    シリーズ
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 uppercase dark:border-slate-700">
                    武器の種類
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 uppercase dark:border-slate-700">
                    解放限界
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 uppercase dark:border-slate-700">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y border-t dark:divide-slate-700 dark:border-slate-700">
                {filteredWeapons.slice(startIndex, endIndex).map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-700/20"
                  >
                    <td className="whitespace-nowrap px-6 py-3 dark:border-slate-700">
                      {row.id}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 dark:border-slate-700">
                      <div className="flex items-center gap-3">
                        <Image
                          className="h-12 w-auto"
                          src={`/images/weapons/m_${row.weaponId}.jpg`}
                          width={210}
                          height={120}
                          alt={String(row.weaponId)}
                        />
                        <div className="flex flex-col gap-1">
                          <div>{row.jpName}</div>
                          <div className=" text-xs">{row.enName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 dark:border-slate-700">
                      {row.weaponId}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 dark:border-slate-700">
                      {row.series ? (
                        <div className="inline-block rounded bg-slate-100 px-1.5 py-0.5 text-xs ring-1 ring-slate-200 dark:bg-slate-700 dark:ring-slate-600 ">
                          {row.series}
                        </div>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 dark:border-slate-700">
                      <Image
                        className="h-6 w-auto"
                        src={`/images/group/${groupName[String(row.type)]}.png`}
                        width={85}
                        height={35}
                        alt={String(row.type)}
                      />
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 dark:border-slate-700">
                      <div className="flex items-center">
                        <StarRating breakLimit={row.breakLimit} />
                      </div>
                    </td>
                    <td
                      className="cursor-pointer whitespace-nowrap px-6 py-3 dark:border-slate-700"
                      onClick={() => {
                        setOpenSheet(true)
                        setCurrentWeapon(row)
                      }}
                    >
                      詳細
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-center border-t border-slate-300 px-6 py-4 dark:border-slate-700">
              <Pagination
                currentPageIndex={currentPageIndex}
                totalPages={totalPages}
                onFristPage={() => goToFirstPage()}
                onNextPage={() => goToNextPage()}
                onPreviousPage={() => goToPreviousPage()}
                onLastPage={() => goToLastPage()}
              />
            </div>
          </ScrollArea>
        </div>

        <div className="hidden h-full w-80 gap-8 overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 md:flex-row md:items-start xl:flex xl:flex-col">
          <ScrollArea>
            <div className="p-4">
              <WeaponFilter
                weapons={weapons}
                weaponTypes={weaponTypes}
                weaponElements={weaponElements}
                weaponSeries={weaponSeries}
                onClick={(params: any) => {
                  setFilteredWeapons(params.filteredData)
                }}
              ></WeaponFilter>
            </div>
          </ScrollArea>
        </div>
      </div>

      <div className="flex flex-col gap-3 lg:hidden">
        {filteredWeapons.slice(startIndex, endIndex).map((row) => {
          return (
            <div
              key={row.id}
              className="flex flex-col gap-6 overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow dark:border-slate-700 dark:bg-slate-800"
            >
              <WeaponsCard
                weapon={row}
                onClick={() => {
                  setOpenSheet(true)
                  setCurrentWeapon(row)
                }}
              />
            </div>
          )
        })}
        <div className="flex items-center justify-center border-t border-slate-300 px-6 py-4 dark:border-slate-700">
          <Pagination
            currentPageIndex={currentPageIndex}
            totalPages={totalPages}
            onFristPage={() => goToFirstPage()}
            onNextPage={() => goToNextPage()}
            onPreviousPage={() => goToPreviousPage()}
            onLastPage={() => goToLastPage()}
          />
        </div>
      </div>

      <Sheet
        open={openFilterSheet}
        onOpenChange={() => setOpenFilterSheet(!openFilterSheet)}
        width="w-full"
        height="h-5/6"
        direction="bottom"
        zIndex="z-50"
      >
        <div className="flex h-full flex-col">
          <SheetHeader
            title="武器の選択"
            onClick={() => setOpenFilterSheet(false)}
          />
          <div className="h-full flex-1 overflow-hidden">
            <ScrollArea>
              <div className="p-6">
                <WeaponFilter
                  weapons={weapons}
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

      <Sheet
        open={openSheet}
        onOpenChange={() => setOpenSheet(!openSheet)}
        width="w-full lg:w-1/2"
        height="h-full"
        direction="right"
        zIndex="z-40"
      >
        <div className="flex h-full flex-col">
          <SheetHeader
            title="武器の詳細情報"
            onClick={() => setOpenSheet(false)}
          />
          <ScrollArea>
            <div className="p-6">
              <WeaponDetail
                currentWeapon={currentWeapon}
                weaponElements={weaponElements}
                weaponTypes={weaponTypes}
                itemList={itemList}
              />
            </div>
          </ScrollArea>
        </div>
      </Sheet>
    </Container>
  )
}

export default WeaponsTable
