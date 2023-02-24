'use client'
import React, { forwardRef, Fragment } from 'react'
import * as RadixToast from '@radix-ui/react-toast'
import { Transition } from '@headlessui/react'
import classnames from 'classnames'
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/solid'

type ClassNames = {
  [key: string]: {
    [key: string]: string
  }
}

type Props = {
  title?: string
  description?: string
  direction?: 'top' | 'center' | 'bottom' | 'right'
  type?: 'success' | 'error'
  open: boolean
  onOpenChange: Function
  children: React.ReactNode
}

const typeClassNames: ClassNames = {
  success: {
    icon: 'dark:bg-green-300/10 dark:text-green-300 bg-green-200 text-green-800',
  },
  error: {
    icon: 'dark:bg-red-300/10 dark:text-red-300 bg-red-200 text-red-800',
  },
}

const directionClassNames: ClassNames = {
  top: {
    root: 'left-1/2 top-6 -translate-y-1/2 -translate-x-1/2',
    from: '-translate-y-full',
    to: '-translate-y-0',
  },
  bottom: {
    root: 'left-1/2 bottom-6 -translate-y-1/2 -translate-x-1/2',
    from: 'translate-y-full',
    to: 'translate-y-0',
  },
  center: {
    root: 'left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2',
    from: '-translate-y-1/2',
    to: '-translate-y-1/2',
  },
  right: {
    root: 'right-6 top-6',
    from: 'translate-x-full',
    to: 'translate-x-0',
  },
}

const Toast = forwardRef<React.ElementRef<typeof RadixToast.Root>, Props>(
  (
    {
      title = 'Title',
      description = 'Description',
      direction = 'top',
      type = 'success',
      open = false,
      onOpenChange = () => {},
      children,
    },
    ref,
  ) => {
    const rootClassNames = classnames(
      'fixed z-50 rounded-lg ring-1 ring-slate-100 shadow-lg dark:ring-slate-800 w-96 bg-white shadow-lg p-4 text-slate-800 dark:bg-slate-900 dark:text-slate-300',
      directionClassNames[direction]['root'],
    )

    const iconClassNames = classnames(
      'mx-auto flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full',
      typeClassNames[type]['icon'],
    )

    return (
      <RadixToast.Provider>
        {children}
        <RadixToast.Root
          ref={ref}
          open={open}
          onOpenChange={() => onOpenChange()}
          duration={3000}
          className={rootClassNames}
          forceMount
          asChild
        >
          <Transition
            as={Fragment}
            show={open}
            enter="transition ease-out duration-200"
            enterFrom={`opacity-0 ${directionClassNames[direction]['from']}`}
            enterTo={`opacity-100 ${directionClassNames[direction]['to']}`}
            leave="transition ease-in duration-150"
            leaveFrom={`opacity-100 ${directionClassNames[direction]['to']}`}
            leaveTo={`opacity-0 ${directionClassNames[direction]['from']}`}
          >
            <div className="flex items-center gap-3">
              <div className={iconClassNames}>
                {type === 'success' ? (
                  <CheckIcon className="h-4 w-4" />
                ) : (
                  <XMarkIcon className="h-4 w-4" />
                )}
              </div>
              <div className="flex w-full flex-1 flex-col gap-1">
                <RadixToast.Title className="text-sm font-bold text-slate-600 dark:text-slate-50">
                  {title}
                </RadixToast.Title>
                <RadixToast.Description className="text-xs text-slate-600 dark:text-slate-400">
                  {description}
                </RadixToast.Description>
              </div>
            </div>
          </Transition>
        </RadixToast.Root>
        <RadixToast.Viewport />
      </RadixToast.Provider>
    )
  },
)
Toast.displayName = 'Toast'
export default Toast
