'use client'
import * as Menubar from '@radix-ui/react-menubar'

const MenubarRoot = Menubar.Root
const MenubarMenu = Menubar.Menu
const MenubarTrigger = Menubar.Trigger
const MenubarContent = ({ children }: { children: React.ReactNode }) => (
  <Menubar.Portal>
    <Menubar.Content
      className="z-50 mt-2 w-36 space-y-1 rounded-xl bg-white p-3 text-sm font-medium shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/5"
      align="start"
      sideOffset={3}
      alignOffset={-3}
    >
      {children}
    </Menubar.Content>
  </Menubar.Portal>
)
const MenubarItem = ({
  children,
  onSelect = () => {},
  isSlected = false,
}: {
  children: React.ReactNode
  onSelect?: Function
  isSlected?: boolean
}) => (
  <Menubar.Item
    onSelect={() => onSelect()}
    className={`flex cursor-pointer select-none items-center p-1 outline-none hover:rounded-full hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900/60 ${
      isSlected
        ? 'text-sky-500 dark:text-sky-500'
        : 'text-slate-700 dark:hover:text-white'
    }`}
  >
    {children}
  </Menubar.Item>
)

export { MenubarRoot, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem }
