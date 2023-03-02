import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid'
import Button from './Button'

interface Param {
  currentPageIndex: number
  totalPages: number
  onFristPage: Function
  onNextPage: Function
  onPreviousPage: Function
  onLastPage: Function
}

const Pagination = ({
  currentPageIndex = 1,
  totalPages = 1,
  onFristPage = (f: any) => f,
  onNextPage = (n: any) => n,
  onPreviousPage = (p: any) => p,
  onLastPage = (l: any) => l,
}: Param) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        appearance="secondary"
        variant="outlined"
        size="sm"
        isOnlyIcon
        onClick={() => onFristPage()}
        isDisabled={currentPageIndex === 1}
      >
        <ChevronDoubleLeftIcon className="h-4 w-4" />
      </Button>
      <Button
        appearance="secondary"
        variant="outlined"
        size="sm"
        isOnlyIcon
        onClick={() => onPreviousPage()}
        isDisabled={currentPageIndex === 1}
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
      <div>
        {currentPageIndex}/{totalPages}
      </div>
      <Button
        appearance="secondary"
        variant="outlined"
        size="sm"
        isOnlyIcon
        onClick={() => onNextPage()}
        isDisabled={currentPageIndex === totalPages}
      >
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
      <Button
        appearance="secondary"
        variant="outlined"
        size="sm"
        isOnlyIcon
        onClick={() => onLastPage()}
        isDisabled={currentPageIndex === totalPages}
      >
        <ChevronDoubleRightIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}
export default Pagination
