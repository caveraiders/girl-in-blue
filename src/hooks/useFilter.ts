'use client'
import { useEffect, useState } from 'react'

const useFilter = (data: any[], filters: any) => {
  const [filteredData, setFilteredData] = useState<any[]>(data)
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

  return { filteredData }
}
export default useFilter
