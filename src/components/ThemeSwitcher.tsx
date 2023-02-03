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

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const initalThemes: string[] = ['light', 'dark', 'system']
  const itemIconStyle =
    'rounded-md bg-white p-1 shadow ring-1 ring-slate-900/5 dark:bg-slate-700 dark:ring-inset dark:ring-white/5'
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
              selected={item}
              onClick={() => setTheme(item)}
              classStyle={
                item === theme
                  ? 'text-sky-500 dark:text-sky-500'
                  : 'dark:hover:text-white'
              }
            >
              <div className={`${itemIconStyle}`}>
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

export default ThemeToggle
