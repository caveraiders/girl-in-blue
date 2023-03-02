import React, { useState, useEffect, useCallback } from 'react'

interface ScrollProps {
  showUnder: number
}

const useScrollTop = ({ showUnder }: ScrollProps) => {
  const [showScroll, setShowScroll] = useState(false)

  const checkScrollTop = useCallback(() => {
    if (!showScroll && window.pageYOffset > showUnder) {
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= showUnder) {
      setShowScroll(false)
    }
  }, [showScroll, showUnder])

  const scrollTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop
    if (c > 0) {
      window.requestAnimationFrame(scrollTop)
      window.scrollTo(0, c - c / 8)
    }
  }

  useEffect(() => {
    let scrollTimer: number

    const handleScroll = () => {
      if (scrollTimer) window.cancelAnimationFrame(scrollTimer)
      scrollTimer = window.requestAnimationFrame(checkScrollTop)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimer) window.cancelAnimationFrame(scrollTimer)
    }
  }, [checkScrollTop])

  return { showScroll, scrollTop }
}

export default useScrollTop
