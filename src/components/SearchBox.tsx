import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useEffect, useMemo } from 'react'

interface Props {
  data: any[]
  searchFields: string[]
  onSearch: (results: any) => void
  placeholder: string
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

function SearchBox({
  data,
  searchFields,
  onSearch,
  placeholder,
  searchTerm,
  setSearchTerm,
}: Props) {
  const searchResults = useMemo(
    () =>
      data.filter((item) => {
        return searchFields.some((field: string) => {
          return String(item[field])
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        })
      }),
    [searchTerm],
  )

  useEffect(() => {
    onSearch(searchResults)
  }, [searchTerm])

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon className="h-5 w-5 dark:text-slate-600" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className="h-12 w-full rounded-lg border border-slate-700 pl-10 text-sm focus:border-sky-400 focus:ring-4 focus:ring-sky-200 dark:border-slate-600 dark:bg-slate-800 dark:placeholder-slate-600 dark:ring-slate-700 dark:focus:border-sky-400 dark:focus:ring-sky-300/20"
        placeholder={placeholder || `Search by ${searchFields.join(' or ')}`}
      />
    </div>
  )
}

export default SearchBox
