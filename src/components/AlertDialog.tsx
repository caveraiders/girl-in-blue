'use client'
import React, { ReactNode, forwardRef } from 'react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import Button from './Button'

const AlertRoot = AlertDialog.Root
const AlertTrigger = AlertDialog.Trigger
const AlertContent = forwardRef<
  React.ElementRef<typeof AlertDialog.Content>,
  {
    children: ReactNode
  }
>(({ children }, ref) => {
  return (
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="fixed inset-0 bg-black/30" />
      <AlertDialog.Content
        className="fixed left-1/2 top-1/2 z-50 grid w-4/5 max-w-lg -translate-y-1/2 -translate-x-1/2 scale-100 rounded-lg bg-white pt-4 dark:bg-slate-900"
        ref={ref}
      >
        {children}
      </AlertDialog.Content>
      className=
    </AlertDialog.Portal>
  )
})
AlertContent.displayName = 'AlertContent'

const AlertContainer = forwardRef<any, { children: ReactNode }>(
  ({ children }, ref) => (
    <div
      className="flex flex-col items-center gap-3 px-4 md:flex-row md:items-start"
      ref={ref}
    >
      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
        <svg
          className="h-6 w-6 text-red-600"
          x-description="Heroicon name: outline/exclamation-triangle"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          ></path>
        </svg>
      </div>
      <div className="text-center md:text-left">{children}</div>
    </div>
  ),
)
AlertContainer.displayName = 'AlertContainer'

const AlertTitle = forwardRef<
  React.ElementRef<typeof AlertDialog.Title>,
  { children: ReactNode }
>(({ children }, ref) => (
  <AlertDialog.Title
    ref={ref}
    className="font-display m-0 text-xl text-sky-900 dark:text-sky-400"
  >
    {children}
  </AlertDialog.Title>
))
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = forwardRef<
  React.ElementRef<typeof AlertDialog.Description>,
  { children: ReactNode }
>(({ children }, ref) => (
  <AlertDialog.Description
    ref={ref}
    className="prose prose-a:text-sky-900 prose-code:text-sky-900 dark:prose-code:text-slate-300 mt-2.5 text-sky-800 [--tw-prose-background:theme(colors.sky.50)] dark:text-slate-300"
  >
    {children}
  </AlertDialog.Description>
))
AlertDescription.displayName = 'AlertDescription'

interface ButtonProp {
  appearance?: 'primary' | 'danger'
  onClick?: Function
}
const AlertButton = forwardRef<any, ButtonProp>(
  ({ appearance = 'primary', onClick = (v: void) => v }, ref) => (
    <div
      className="flex flex-col-reverse justify-end gap-3 p-4 shadow-md dark:bg-slate-900 md:flex-row"
      ref={ref}
    >
      <AlertDialog.Cancel asChild>
        <Button appearance="secondary" variant="outlined">
          キャンセル
        </Button>
      </AlertDialog.Cancel>
      <AlertDialog.Action asChild>
        <Button appearance={appearance} onClick={() => onClick()}>
          OK
        </Button>
      </AlertDialog.Action>
    </div>
  ),
)
AlertButton.displayName = 'AlertButton'

export {
  AlertRoot,
  AlertTrigger,
  AlertContent,
  AlertButton,
  AlertTitle,
  AlertDescription,
  AlertContainer,
}
