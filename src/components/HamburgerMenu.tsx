import { useState } from 'react'

interface Prop {
  direction?: 'positive' | 'negative'
  className?: string
}
const HamburgerMenu = ({
  direction = 'positive',
  className = 'bg-slate-800 dark:bg-sky-500',
}: Prop) => {
  const [check, setCheck] = useState<boolean>(false)
  return (
    <div
      className={`flex h-6 w-6 cursor-pointer flex-col gap-[6px] ${
        direction !== 'positive' ? 'items-end' : ''
      }`}
      onClick={() => setCheck(!check)}
    >
      <span
        className={`h-0.5 w-1/2 rounded-lg duration-300 ease-in ${className} ${
          check
            ? direction !== 'positive'
              ? 'origin-top -translate-x-[2px] translate-y-[4px]  -rotate-45'
              : 'origin-top translate-x-[2px] translate-y-[4px]  rotate-45 '
            : ''
        }`}
      ></span>
      <span
        className={`h-0.5 w-full rounded-lg duration-300 ease-in ${className} ${
          check
            ? direction !== 'positive'
              ? 'origin-center rotate-45'
              : 'origin-center -rotate-45'
            : ''
        }`}
      ></span>
      <span
        className={`h-0.5 rounded-lg duration-300 ease-in ${className} ${
          check
            ? direction !== 'positive'
              ? 'w-1/2 origin-bottom -translate-x-[9px] -translate-y-[4px] -rotate-45'
              : 'w-1/2 origin-bottom translate-x-[9px] -translate-y-[4px]  rotate-45'
            : 'w-3/4'
        }`}
      ></span>
    </div>
  )
}
export default HamburgerMenu
