'use client'
import Button from '@/components/Button'
import SearchBox from '@/components/SearchBox'
import useFilter from '@/hooks/useFilter'
import { Weapon } from '@/types/Weapon'
import { ArrowPathIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'

type WeaponFilterProps = {
  weaponTypes: string[]
  weaponElements: string[]
  weaponSeries: string[]
  onClick: (type: object) => void
  weapons: any[]
  children?: any
}

const WeaponFilter = ({
  weaponTypes,
  weaponElements,
  weaponSeries,
  onClick,
  weapons,
}: WeaponFilterProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Weapon[]>([])
  const { filteredData, filters, setFilters } = useFilter(searchResults, {
    type: [],
    element: [],
    series: [],
  })

  const resetFilters = () =>
    setFilters({
      type: [],
      element: [],
      series: [],
    })

  useEffect(() => {
    onClick({
      filteredData,
    })
  }, [filteredData, filters, onClick])

  return (
    <div className="flex flex-col gap-8">
      <SearchBox
        data={weapons}
        searchFields={['jpName', 'enName', 'weaponId']}
        onSearch={(results: Weapon[]) => setSearchResults(results)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="武器名またはIDを入力してください"
      />
      <div className="flex flex-wrap gap-8">
        <div className="flex flex-col gap-3">
          <div className="font-bold">属性</div>
          <div className="flex flex-wrap items-center gap-3">
            {weaponElements.map((weaponElement: string) => (
              <Button
                variant={
                  filters.element?.includes(weaponElement)
                    ? 'filled'
                    : 'outlined'
                }
                appearance={
                  filters.element?.includes(weaponElement)
                    ? 'primary'
                    : 'secondary'
                }
                size="md"
                key={weaponElement}
                onClick={() =>
                  setFilters({
                    ...filters,
                    element: filters.element?.includes(weaponElement)
                      ? filters.element?.filter(
                          (item: string) => item !== weaponElement,
                        )
                      : [...filters.element, weaponElement],
                  })
                }
              >
                {weaponElement}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="font-bold">武器の種類</div>
          <div className="flex flex-wrap items-center gap-3">
            {weaponTypes.map((weaponType: string) => (
              <Button
                variant={
                  filters.type?.includes(weaponType) ? 'filled' : 'outlined'
                }
                appearance={
                  filters.type?.includes(weaponType) ? 'primary' : 'secondary'
                }
                size="md"
                key={weaponType}
                onClick={() =>
                  setFilters({
                    ...filters,
                    type: filters.type?.includes(weaponType)
                      ? filters.type?.filter(
                          (item: string) => item !== weaponType,
                        )
                      : [...filters.type, weaponType],
                  })
                }
              >
                {weaponType}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="font-bold">シリーズ</div>
          <div className="flex flex-wrap items-center gap-3">
            {weaponSeries.map((weaponSeriesItem: string) => (
              <Button
                variant={
                  filters.series?.includes(weaponSeriesItem)
                    ? 'filled'
                    : 'outlined'
                }
                appearance={
                  filters.series?.includes(weaponSeriesItem)
                    ? 'primary'
                    : 'secondary'
                }
                size="md"
                key={weaponSeriesItem}
                onClick={() =>
                  setFilters({
                    ...filters,
                    series: filters.series?.includes(weaponSeriesItem)
                      ? filters.series?.filter(
                          (item: string) => item !== weaponSeriesItem,
                        )
                      : [...filters.series, weaponSeriesItem],
                  })
                }
              >
                {weaponSeriesItem}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div>
        <Button
          appearance="danger"
          variant="outlined"
          isDisabled={
            Object.values(filters).every(
              (filter: any) => filter.length === 0,
            ) && searchTerm === ''
          }
          onClick={() => {
            resetFilters()
            setSearchTerm('')
          }}
        >
          <ArrowPathIcon className="h-5 w-5" />
          すべてのフィルタ条件をクリア
        </Button>
      </div>
    </div>
  )
}

export default WeaponFilter
