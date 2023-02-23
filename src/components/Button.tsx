'use client'

import classnames from 'classnames'

type Props = {
  children: React.ReactNode
  appearance?: string
  isFullWidth?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  variant?: 'filled' | 'outlined' | 'text'
  isDisabled?: boolean
  isOnlyIcon?: boolean
  type?: 'button' | 'submit' | 'reset'
  size?: 'sm' | 'md' | 'lg'
}

type AppearanceClassNames = {
  [key: string]: {
    [key: string]: string
  }
}

const Button = ({
  children,
  appearance = 'primary',
  isFullWidth = false,
  variant = 'filled',
  isDisabled = false,
  onClick = () => {},
  isOnlyIcon = false,
  type = 'button',
  size = 'lg',
}: Props) => {
  const appearanceClassNames: AppearanceClassNames = {
    primary: {
      filled:
        'bg-sky-500 text-white dark:bg-sky-400 hover:bg-sky-600 dark:hover:bg-sky-500 focus:outline-none focus:ring-4 dark:focus:ring-sky-800 focus:ring-sky-300 disabled:bg-sky-300 dark:disabled:bg-sky-300 disabled:cursor-not-allowed',
      outlined:
        'bg-transparent text-sky-500 border border-sky-500 dark:border-sky-300 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-sky-300/10 focus:outline-none focus:ring-4 dark:focus:ring-sky-800 focus:ring-sky-300 disabled:bg-sky-50 dark:disabled:bg-sky-300/10 disabled:cursor-not-allowed',
      text: 'bg-transparent text-sky-500 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-sky-300/10 disabled:bg-transparent disabled:text-sky-300 disabled:dark:text-sky-600 dark:disabled:bg-transparent disabled:cursor-not-allowed',
    },
    secondary: {
      filled:
        'bg-slate-700 text-white dark:bg-slate-800 hover:bg-slate-600 dark:hover:bg-slate-700 focus:outline-none focus:ring-4 dark:focus:ring-slate-600 focus:ring-slate-300 disabled:bg-slate-600 dark:disabled:bg-slate-600 disabled:cursor-not-allowed',
      outlined:
        'bg-transparent text-slate-700 border border-slate-700 dark:border-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-300/10 focus:outline-none focus:ring-4 dark:focus:ring-slate-600 focus:ring-slate-300 disabled:bg-slate-100 dark:disabled:bg-slate-300/10 disabled:cursor-not-allowed',
      text: 'bg-transparent text-slate-700 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-300/10 disabled:bg-transparent disabled:text-slate-400 disabled:dark:text-slate-600 dark:disabled:bg-transparent disabled:cursor-not-allowed',
    },
    danger: {
      filled:
        'bg-red-500 text-white dark:bg-red-400 hover:bg-red-600 dark:hover:bg-red-500 focus:outline-none focus:ring-4 dark:focus:ring-slate-600 focus:ring-red-300 disabled:bg-red-300 dark:disabled:bg-red-300 disabled:cursor-not-allowed',
      outlined:
        'bg-transparent text-red-500 border border-red-500 dark:border-red-300 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-300/10 focus:outline-none focus:ring-4 dark:focus:ring-slate-600 focus:ring-red-300 disabled:bg-red-50 dark:disabled:bg-red-300/10 disabled:cursor-not-allowed',
      text: 'bg-transparent text-red-500 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-300/10 disabled:bg-transparent disabled:text-red-300 disabled:dark:text-red-900 dark:disabled:bg-transparent disabled:cursor-not-allowed',
    },
  }

  const buttonClassNames = classnames(
    'flex items-center justify-center gap-1.5 rounded-lg font-medium',
    appearanceClassNames[appearance][variant],
    {
      'w-full': isFullWidth,
      'h-6 px-4 text-xs': size === 'sm',
      'h-8 px-5 text-sm': size === 'md',
      'h-10 px-6 text-sm': size === 'lg',
    },
    {
      'h-10 w-10 px-0': isOnlyIcon,
    },
  )

  return (
    <button
      type={type}
      className={buttonClassNames}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}

export default Button
