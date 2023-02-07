'use client'
import * as Switch from '@radix-ui/react-switch'
interface Root {
  isCheck?: boolean
  onSelect?: Function
}
const SwitchRoot = ({
  isCheck = false,
  onSelect = (b: boolean) => b,
}: Root) => {
  return (
    <Switch.Root
      className="h-6 w-10 rounded-full bg-slate-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-slate-200 data-[state=checked]:bg-sky-500 dark:data-[state=unchecked]:bg-slate-700 dark:data-[state=checked]:bg-sky-500"
      checked={isCheck}
      onCheckedChange={(isChange) => {
        onSelect(isChange)
      }}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <Switch.Thumb className="pointer-events-none block h-5 w-5 translate-x-0 rounded-full bg-white transition-transform data-[state=unchecked]:translate-x-0 data-[state=checked]:translate-x-5" />
    </Switch.Root>
  )
}
export { SwitchRoot }
