'use client'
import { useState, useEffect } from 'react'

interface PaginationOptions {
  initialPageIndex?: number
  pageSize: number
  totalItems: number
}

interface PaginationResult {
  currentPageIndex: number
  totalPages: number
  goToPageIndex: (index: number) => void
  goToNextPage: () => void
  goToPreviousPage: () => void
  goToFirstPage: () => void
  goToLastPage: () => void
}

const usePagination = ({
  initialPageIndex = 1,
  pageSize,
  totalItems,
}: PaginationOptions): PaginationResult => {
  const [currentPageIndex, setCurrentPageIndex] = useState(initialPageIndex)

  useEffect(() => {
    setCurrentPageIndex(initialPageIndex)
  }, [initialPageIndex])

  const totalPages = Math.ceil(totalItems / pageSize)

  const goToPageIndex = (index: number) => {
    if (index > 0 && index <= totalPages) {
      setCurrentPageIndex(index)
    }
  }

  const goToNextPage = () => {
    if (currentPageIndex < totalPages) {
      setCurrentPageIndex(currentPageIndex + 1)
    }
  }

  const goToPreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1)
    }
  }

  const goToFirstPage = () => {
    setCurrentPageIndex(1)
  }

  const goToLastPage = () => {
    setCurrentPageIndex(totalPages)
  }

  return {
    currentPageIndex,
    totalPages,
    goToPageIndex,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
  }
}

export default usePagination
