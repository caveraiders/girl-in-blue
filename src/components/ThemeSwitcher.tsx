'use client'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon, DesktopIcon } from '@radix-ui/react-icons'
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRoot,
  MenubarTrigger,
} from './Menubar'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()
  const initalThemes: string[] = ['light', 'dark', 'system']
  return (
    <MenubarRoot>
      <MenubarMenu>
        <MenubarTrigger>
          <SunIcon className="h-4 w-4 text-sky-500 dark:hidden" />
          <MoonIcon className="hidden h-4 w-4 text-sky-500 dark:inline" />
        </MenubarTrigger>
        <MenubarContent>
          {initalThemes.map((item) => (
            <MenubarItem
              key={item}
              onSelect={() => setTheme(item)}
              isSlected={item === theme}
            >
              <div className="rounded-md bg-white p-1 shadow ring-1 ring-slate-900/5 dark:bg-slate-700 dark:ring-inset dark:ring-white/5">
                {item === 'light' ? (
                  <SunIcon className="h-4 w-4 " />
                ) : item === 'dark' ? (
                  <MoonIcon className="h-4 w-4" />
                ) : (
                  <DesktopIcon className="h-4 w-4" />
                )}
              </div>
              <span className="ml-3 capitalize">{item}</span>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </MenubarRoot>
  )
}

export default ThemeSwitcher
