import { useCallback, useState, useEffect, MutableRefObject } from 'react'

const useInfiniteFrontendPagination = (
  data: any[],
  pageSize: number = 20,
  rootRef: MutableRefObject<HTMLElement | null>,
  targetRef: MutableRefObject<HTMLElement | null>,
) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const startIndex: number = (currentPage - 1) * pageSize
  const endIndex: number = startIndex + pageSize
  const [currentData, setCurrentData] = useState<any[]>(
    data.slice(startIndex, endIndex),
  )
  const nextPage = useCallback(() => setCurrentPage((prev) => prev + 1), [])

  const loadMoreData = useCallback(
    () =>
      setCurrentData((prev: any) => [
        ...prev,
        ...data.slice(prev.length, prev.length + pageSize),
      ]),
    [data, pageSize],
  )

  /**
   * Check if there is more data to load
   */
  const hasMoreData: boolean = data.length > currentData.length

  /**
   * Reset current page and current data when data or pageSize changes
   */
  useEffect(() => {
    setCurrentPage(1)
    setCurrentData(data.slice(0, pageSize))
  }, [data, pageSize])

  /**
   * Load more data when the target element is intersecting with the root element
   */
  useEffect(() => {
    const callback = (entries: any[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasMoreData) {
          nextPage()
          loadMoreData()
        }
      })
    }
    const options = {
      root: rootRef.current,
      rootMargin: '0px',
      threshold: 1.0,
    }
    const observer = new IntersectionObserver(callback, options)

    targetRef.current && observer.observe(targetRef.current)

    return () => {
      observer.disconnect()
    }
  }, [hasMoreData, loadMoreData, nextPage, rootRef, targetRef])
  return {
    currentData,
    hasMoreData,
  }
}

export default useInfiniteFrontendPagination
