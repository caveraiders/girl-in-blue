'use client'
import { useTheme } from 'next-themes'
import * as Menubar from '@radix-ui/react-menubar'
import { SunIcon, MoonIcon, LaptopIcon } from '@radix-ui/react-icons'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <Menubar.Root>
      <Menubar.Menu>
        <Menubar.Trigger className="outline-none">
          <SunIcon className="h-5 w-5 dark:hidden" />
          <MoonIcon className="hidden h-5 w-5 dark:inline" />
        </Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content
            className="z-50 mx-1 flex w-36 flex-col rounded-md bg-white py-1 text-sm font-semibold text-slate-700 shadow-md dark:bg-slate-800 dark:text-slate-300"
            align="start"
            sideOffset={3}
            alignOffset={-3}
          >
            <Menubar.Item
              onClick={() => setTheme('light')}
              className={`flex h-9 cursor-pointer items-center gap-3 px-2 text-sm outline-none hover:bg-slate-100 dark:hover:bg-slate-700 ${
                theme === 'light' ? 'text-sky-500' : ''
              }`}
            >
              <SunIcon className="h-5 w-5" />
              <span className="capitalize">Light</span>
            </Menubar.Item>
            <Menubar.Item
              onClick={() => setTheme('dark')}
              className={`flex h-9 cursor-pointer items-center gap-3 px-2 text-sm outline-none hover:bg-slate-100 dark:hover:bg-slate-700 ${
                theme === 'dark' ? 'text-sky-500' : ''
              }`}
            >
              <MoonIcon className="h-5 w-5" />
              <span className="capitalize">Dark</span>
            </Menubar.Item>
            <Menubar.Item
              onClick={() => setTheme('system')}
              className={`flex h-9 cursor-pointer items-center gap-3 px-2 text-sm outline-none hover:bg-slate-100 dark:hover:bg-slate-700 ${
                theme === 'system' ? 'text-sky-500' : ''
              }`}
            >
              <LaptopIcon className="h-5 w-5" />
              <span className="capitalize">System</span>
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>
    </Menubar.Root>
  )
}

export default ThemeToggle
