'use client'
import React, { forwardRef, Fragment, ReactNode } from 'react'
import * as Toast from '@radix-ui/react-toast'
import {
  CheckIcon,
  InfoCircledIcon,
  ExclamationTriangleIcon,
} from '@radix-ui/react-icons'
import { Transition } from '@headlessui/react'

const ToastProvider = Toast.Provider
// const ToastRoot = Toast.Root

interface Prop {
  children: ReactNode
  open: boolean
  onOpenChange: Function
  type?: 'success' | 'error' | 'warning'
  position?: 'top' | 'center' | 'bottom' | 'right'
}
const ToastRoot = forwardRef<React.ElementRef<typeof Toast.Root>, Prop>(
  (
    {
      children,
      open = false,
      onOpenChange = () => {},
      type = 'success',
      position = 'bottom',
    },
    ref,
  ) => {
    let classStyle = 'bg-green-100 text-green-800'
    let icon = <CheckIcon className="h-6 w-6" />
    switch (type) {
      case 'error':
        classStyle = 'bg-red-100 text-red-800'
        icon = <ExclamationTriangleIcon className="h-5 w-5" />

        break
      case 'warning':
        classStyle = 'bg-yellow-50 text-yellow-800'
        icon = <InfoCircledIcon className="h-5 w-5" />
        break
    }

    let style1: string = 'translate-y-full'
    let style2: string = 'translate-y-0'
    let positionStyle = 'left-1/2 bottom-1 -translate-y-1/2 -translate-x-1/2'
    switch (position) {
      case 'top':
        style1 = '-translate-y-full'
        style2 = '-translate-y-0'
        positionStyle = 'left-1/2 top-1 -translate-y-1/2 -translate-x-1/2'
        break
      case 'center':
        style1 = '-translate-y-1/2'
        style2 = '-translate-y-1/2'
        positionStyle = 'left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2'
        break
      case 'right':
        style1 = 'translate-x-full'
        style2 = 'translate-x-0'
        positionStyle = 'right-1 top-1 '
        break
    }

    return (
      <Toast.Root
        ref={ref}
        open={open}
        onOpenChange={() => onOpenChange()}
        duration={100000}
        className={`fixed z-50 rounded-lg border border-slate-100 bg-white/90 px-4 py-3 text-slate-800 dark:bg-slate-900 dark:text-slate-300 ${positionStyle}`}
        forceMount
        asChild
      >
        <Transition
          as={Fragment}
          show={open}
          enter="transition ease-out duration-200"
          enterFrom={`opacity-0 ${style1}`}
          enterTo={`opacity-100 ${style2}`}
          leave="transition ease-in duration-150"
          leaveFrom={`opacity-100 ${style2}`}
          leaveTo={`opacity-0 ${style1}`}
        >
          <div className="flex gap-2">
            <div
              className={`mx-auto flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${classStyle}`}
            >
              {icon}
            </div>
            <div className="w-full flex-1">{children}</div>
          </div>
        </Transition>
      </Toast.Root>
    )
  },
)
ToastRoot.displayName = 'ToastRoot'

const ToastTitle = forwardRef<
  React.ElementRef<typeof Toast.Title>,
  { children: ReactNode }
>(({ children }, ref) => <Toast.Title ref={ref}>{children}</Toast.Title>)
ToastTitle.displayName = 'ToastTitle'

const ToastDescription = forwardRef<
  React.ElementRef<typeof Toast.Description>,
  { children: ReactNode }
>(({ children }, ref) => (
  <Toast.Description ref={ref}>{children}</Toast.Description>
))
ToastDescription.displayName = 'ToastDescription'

const ToastAction = forwardRef<
  React.ElementRef<typeof Toast.Action>,
  { children: ReactNode }
>(({ children }, ref) => (
  <Toast.Action asChild ref={ref} altText="Goto schedule to undo">
    {children}
  </Toast.Action>
))
ToastAction.displayName = 'ToastAction'

const ToastViewport = Toast.Viewport

export {
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastViewport,
}
