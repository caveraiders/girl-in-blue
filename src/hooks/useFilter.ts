'use client'
import { useEffect, useState } from 'react'

const useFilter = (
  data: any[],
  defaultFilters: { [key: string]: string[] },
) => {
  const [filteredData, setFilteredData] = useState<any[]>(data)
  const [filters, setFilters] = useState(defaultFilters)
  useEffect(() => {
    setFilteredData(
      data.filter((item) => {
        return Object.keys(filters).every((key) => {
          if (!filters[key].length) return true
          return filters[key].includes(item[key])
        })
      }),
    )
  }, [filters])

  return { filteredData, filters, setFilters }
}
export default useFilter
