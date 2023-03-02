import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useEffect, useMemo } from 'react'

interface SearchableItem {
  [key: string]: string | number
}

interface Props<T extends SearchableItem> {
  data: T[]
  searchFields: (keyof T)[]
  onSearch: (results: T[]) => void
  placeholder?: string
  searchTerm?: string
  setSearchTerm?: React.Dispatch<React.SetStateAction<string>>
}

function SearchBox<T extends SearchableItem>({
  data,
  searchFields,
  onSearch,
  placeholder,
  searchTerm,
  setSearchTerm,
}: Props<T>) {
  const searchResults = useMemo(
    () =>
      data.filter((item) => {
        return searchFields.some((field) => {
          return String(item[field])
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        })
      }),
    [data, searchFields, searchTerm],
  )

  useEffect(() => {
    onSearch(searchResults)
  }, [onSearch, searchResults])

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon className="h-5 w-5 dark:text-slate-600" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className="h-12 w-full rounded-lg border border-slate-700 pl-10 text-sm focus:border-sky-400 focus:ring-4 focus:ring-sky-200 dark:border-slate-600 dark:bg-slate-800 dark:placeholder-slate-600 dark:ring-slate-700 dark:focus:border-sky-400 dark:focus:ring-sky-300/20 lg:w-80"
        placeholder={placeholder || `Search by ${searchFields.join(' or ')}`}
      />
    </div>
  )
}

export default SearchBox
