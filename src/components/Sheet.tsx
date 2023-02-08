'use client'
import { Transition } from '@headlessui/react'
import * as Dialog from '@radix-ui/react-dialog'
import { forwardRef, Fragment } from 'react'

interface contentProps {
  children: React.ReactNode
  isOpen: boolean
  width: string
  height: string
  position?: 'bottom' | 'right' | 'left'
}
const SheetContent = forwardRef<
  React.ElementRef<typeof Dialog.Content>,
  contentProps
>(
  (
    {
      children,
      isOpen = false,
      width = 'w-auto',
      height = 'h-auto',
      position = 'bottom',
    },
    ref,
  ) => {
    let classStyle: string = height !== 'h-full' ? 'rounded-t-3xl' : ''
    let style1: string = 'translate-y-full'
    let style2: string = 'translate-y-0'
    switch (position) {
      case 'right':
        classStyle = 'right-0'
        style1 = 'translate-x-full'
        style2 = 'translate-x-0'
        break
      case 'left':
        classStyle = 'left-0'
        style1 = '-translate-x-full'
        style2 = '-translate-x-0'
        break
    }
    return (
      <Dialog.Portal forceMount>
        <Transition show={isOpen}>
          <Transition.Child as={Fragment}>
            <Dialog.Overlay className="fixed inset-0 bg-black/30" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom={`opacity-0 ${style1}`}
            enterTo={`opacity-100 ${style2}`}
            leave="transition ease-in duration-150"
            leaveFrom={`opacity-100 ${style2}`}
            leaveTo={`opacity-0 ${style1}`}
          >
            <Dialog.Content
              ref={ref}
              className={`fixed bottom-0 bg-white dark:bg-slate-900 dark:text-slate-300 ${height} ${width} ${classStyle}`}
            >
              {children}
            </Dialog.Content>
          </Transition.Child>
        </Transition>
      </Dialog.Portal>
    )
  },
)
SheetContent.displayName = 'SheetContent'
const SheetRoot = Dialog.Root
const SheetTrigger = Dialog.Trigger
const SheetPortal = Dialog.Portal
const SheetClose = Dialog.Close
const SheetTitle = Dialog.Title

export {
  SheetRoot,
  SheetTrigger,
  SheetPortal,
  SheetContent,
  SheetClose,
  SheetTitle,
}
