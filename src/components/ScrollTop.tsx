'use client'
import useScrollTop from '@/hooks/useScrollTop'
import { ArrowUpIcon } from '@heroicons/react/24/solid'
import Button from './Button'

const ScrollTop = () => {
  const { showScroll, scrollTop } = useScrollTop({ showUnder: 100 })
  return (
    <>
      {showScroll && (
        <div className="fixed right-10 bottom-32 z-50">
          <Button
            appearance="secondary"
            variant="filled"
            size="sm"
            isOnlyIcon
            onClick={scrollTop}
          >
            <ArrowUpIcon className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  )
}

export default ScrollTop
