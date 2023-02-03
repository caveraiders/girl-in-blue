'use client'
import { useTheme } from 'next-themes'
import * as Menubar from '@radix-ui/react-menubar'
import { SunIcon, MoonIcon, DesktopIcon } from '@radix-ui/react-icons'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  const itemStyle =
    'flex cursor-pointer select-none items-center p-1 text-slate-700 outline-none hover:rounded-[0.625rem] hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900/60 '
  const itemIconStyle =
    'rounded-md bg-white p-1 shadow ring-1 ring-slate-900/5 dark:bg-slate-700 dark:ring-inset dark:ring-white/5'
  return (
    <Menubar.Root>
      <Menubar.Menu>
        <Menubar.Trigger className="outline-none">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg p-1 shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-700 dark:ring-inset dark:ring-white/5">
            <SunIcon className="h-4 w-4 text-sky-500 dark:hidden" />
            <MoonIcon className="hidden h-4 w-4 text-sky-500 dark:inline" />
          </div>
        </Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content
            className="mt-2 w-36 space-y-1 rounded-xl bg-white p-3 text-sm font-medium shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/5"
            align="start"
            sideOffset={3}
            alignOffset={-3}
          >
            <Menubar.Item
              onClick={() => setTheme('light')}
              className={`${itemStyle} ${
                theme === 'light' ? 'text-sky-500' : 'dark:hover:text-white'
              }`}
            >
              <div className={`${itemIconStyle}`}>
                <SunIcon className="h-4 w-4 " />
              </div>

              <span className="ml-3 capitalize">Light</span>
            </Menubar.Item>
            <Menubar.Item
              onClick={() => setTheme('dark')}
              className={`${itemStyle} ${
                theme === 'dark'
                  ? 'text-sky-500 dark:text-sky-500'
                  : 'dark:hover:text-white'
              }`}
            >
              <div className={`${itemIconStyle}`}>
                <MoonIcon className="h-4 w-4" />
              </div>
              <span className="ml-3 capitalize">Dark</span>
            </Menubar.Item>
            <Menubar.Item
              onClick={() => setTheme('system')}
              className={`${itemStyle} ${
                theme === 'system'
                  ? 'text-sky-500 dark:text-sky-500'
                  : 'dark:hover:text-white'
              }`}
            >
              <div className={`${itemIconStyle}`}>
                <DesktopIcon className="h-4 w-4" />
              </div>
              <span className="ml-3 capitalize">System</span>
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>
    </Menubar.Root>
  )
}

export default ThemeToggle
