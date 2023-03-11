'use client'
import { Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import * as Dialog from '@radix-ui/react-dialog'
import classnames from 'classnames'
import { forwardRef, Fragment, ReactNode, ElementRef } from 'react'
import Button from './Button'

type ClassNames = {
  [key: string]: {
    [key: string]: string
  }
}

type Prop = {
  direction?: 'bottom' | 'right' | 'left'
  zIndex?: string
  width?: string
  height?: string
  open: boolean
  onOpenChange: Function
  trigger?: ReactNode
  children: ReactNode
}

const directionClassNames: ClassNames = {
  left: {
    content: 'left-0',
    from: '-translate-x-full',
    to: '-translate-x-0',
  },
  right: {
    content: 'right-0 h-full',
    from: 'translate-x-full',
    to: 'translate-x-0',
  },
  bottom: {
    content: '',
    from: 'translate-y-full',
    to: 'translate-y-0',
  },
}

const Sheet = forwardRef<ElementRef<typeof Dialog.Content>, Prop>(
  (
    {
      direction = 'bottom',
      zIndex = 'z-auto',
      width = 'w-auto',
      height = 'h-auto',
      open = false,
      onOpenChange = () => {},
      trigger,
      children,
    },
    ref,
  ) => {
    const contentClassNames = classnames(
      'fixed bottom-0 bg-white dark:bg-slate-900 dark:text-slate-300',
      directionClassNames[direction]['content'],
      {
        'left-1/2 -translate-y-1/2 -translate-x-1/2': direction === 'bottom',
        'rounded-t-3xl': direction === 'bottom' && height !== 'h-full',
      },
    )
    return (
      <Dialog.Root open={open} onOpenChange={() => onOpenChange()}>
        <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
        <Dialog.Portal forceMount>
          <Transition show={open}>
            <Transition.Child as={Fragment}>
              <Dialog.Overlay
                className={`fixed inset-0 bg-black/30 ${zIndex}`}
              />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom={`opacity-0 ${directionClassNames[direction]['from']}`}
              enterTo={`opacity-100 ${directionClassNames[direction]['to']}`}
              leave="transition ease-in duration-150"
              leaveFrom={`opacity-100 ${directionClassNames[direction]['to']}`}
              leaveTo={`opacity-0 ${directionClassNames[direction]['from']}`}
            >
              <Dialog.Content
                ref={ref}
                className={`${contentClassNames} ${zIndex} ${width} ${height}`}
              >
                {children}
              </Dialog.Content>
            </Transition.Child>
          </Transition>
        </Dialog.Portal>
      </Dialog.Root>
    )
  },
)
Sheet.displayName = 'Sheet'
export const SheetClose = Dialog.Close
export const SheetHeader = ({ title = '', onClick = (f: any) => f }) => {
  return (
    <header className="flex items-center justify-between border-b border-slate-100 p-4 dark:border-slate-800 dark:text-slate-300">
      <div className="font-bold">{title}</div>
      <Button
        isOnlyIcon
        variant="text"
        appearance="secondary"
        onClick={() => onClick(false)}
      >
        <XMarkIcon className="h-5 w-5" />
      </Button>
    </header>
  )
}
export default Sheet
