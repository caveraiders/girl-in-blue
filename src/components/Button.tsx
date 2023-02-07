type Props = {
  children: React.ReactNode
  appearance?: string
  shouldFitContainer?: boolean
  onClick?: () => void
  variant?: 'filled' | 'outlined' | 'text'
  isDisabled?: boolean
  iconOnly?: boolean
}

const Button = ({
  children,
  appearance = 'primary',
  shouldFitContainer = false,
  variant = 'filled',
  isDisabled = false,
  onClick,
  iconOnly = false,
}: Props) => {
  let primary = ''
  let secondary = ''
  let danger = ''
  if (isDisabled) {
    switch (variant) {
      case 'filled':
        primary =
          'bg-slate-200 text-white dark:bg-slate-800 dark:text-gray-600 cursor-not-allowed'
        secondary =
          'bg-slate-200 text-white dark:bg-slate-800 dark:text-gray-600 cursor-not-allowed'
        danger =
          'bg-slate-200 text-white dark:bg-slate-800 dark:text-gray-600 cursor-not-allowed'
        break
      case 'outlined':
        primary =
          'text-slate-200 border border-slate-200 dark:border-slate-800 dark:text-slate-800 cursor-not-allowed'
        secondary =
          'text-slate-200 border border-slate-200 dark:border-slate-800 dark:text-slate-800 cursor-not-allowed'
        danger =
          'text-slate-200 border border-slate-200 dark:border-slate-800 dark:text-slate-800 cursor-not-allowed'
        break
      case 'text':
        primary = 'text-slate-200 dark:text-slate-800 cursor-not-allowed'
        secondary = 'text-slate-200 dark:text-slate-800 cursor-not-allowed'
        danger = 'text-slate-200 dark:text-slate-800 cursor-not-allowed'
        break
    }
  } else {
    switch (variant) {
      case 'filled':
        primary =
          'bg-sky-500 text-sky-50 dark:bg-sky-300 dark:text-sky-900 hover:bg-sky-600 dark:hover:bg-sky-200 active:bg-sky-700 dark:active:bg-sky-100'
        secondary =
          'bg-slate-500 text-slate-50 dark:bg-slate-300 dark:text-slate-900 hover:bg-slate-600 dark:hover:bg-slate-200 active:bg-slate-700 dark:active:bg-slate-100'
        danger =
          'bg-red-500 text-red-50 dark:bg-red-300 dark:text-red-900 hover:bg-red-600 dark:hover:bg-red-200 active:bg-red-700 dark:active:bg-red-100'
        break
      case 'outlined':
        primary =
          'bg-transparent text-sky-500 border border-sky-500 dark:border-sky-300 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-sky-300/10 active:bg-sky-100 dark:active:bg-sky-300/20'
        secondary =
          'bg-transparent text-slate-500 border border-slate-500 dark:border-slate-300 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-300/10 active:bg-slate-100 dark:active:bg-slate-300/20'
        danger =
          'bg-transparent text-red-500 border border-red-500 dark:border-red-300 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-300/10 active:bg-red-100 dark:active:bg-red-300/20'
        break
      case 'text':
        primary =
          'bg-transparent text-sky-500 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-sky-300/10 active:bg-sky-100 dark:active:bg-sky-300/20'
        secondary =
          'bg-transparent text-slate-500 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-300/10 active:bg-slate-100 dark:active:bg-slate-300/20'
        danger =
          'bg-transparent text-red-500 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-300/10 active:bg-red-100 dark:active:bg-red-300/20'
        break
    }
  }

  switch (appearance) {
    case 'primary':
      appearance = primary
      break
    case 'secondary':
      appearance = secondary
      break
    case 'danger':
      appearance = danger
      break
  }
  if (iconOnly) {
    return (
      <button
        className={`flex h-10 w-10 items-center justify-center rounded-full text-sm ${appearance}`}
        onClick={onClick}
        disabled={isDisabled}
      >
        {children}
      </button>
    )
  }
  return (
    <button
      className={`h-10 rounded-full px-6 text-sm ${appearance} ${
        shouldFitContainer ? 'w-full' : 'w-auto'
      }`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}

export default Button
