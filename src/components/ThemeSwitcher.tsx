'use client'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon, DesktopIcon } from '@radix-ui/react-icons'
import {
  SheetRoot,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/Sheet'
import { SwitchRoot } from './Switch'
import { useState } from 'react'
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRoot,
  MenubarTrigger,
} from './Menubar'

const ThemeSwitcher = () => {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const initalThemes: string[] = ['light', 'dark', 'system']
  const [sheetOpen, setSheetOpen] = useState<boolean>(false)
  return (
    <>
      <MenubarRoot className="hidden md:flex">
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

      <div className="md:hidden">
        <SheetRoot open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger>
            <SunIcon className="h-4 w-4 text-sky-500 dark:hidden" />
            <MoonIcon className="hidden h-4 w-4 text-sky-500 dark:inline" />
          </SheetTrigger>
          <SheetContent
            width="w-full"
            height="h-auto"
            position="bottom"
            isOpen={sheetOpen}
            zIndex="z-50"
          >
            <SheetTitle className="flex justify-center py-3 font-bold">
              Dark mode
            </SheetTitle>
            <div className="flex flex-col gap-6 p-4">
              <div className="flex items-center justify-between">
                <div>Dark mode</div>
                <SwitchRoot
                  isCheck={
                    theme === 'dark' ||
                    (theme === 'system' && resolvedTheme === 'dark')
                      ? true
                      : false
                  }
                  onSelect={(isSelected: boolean) => {
                    isSelected ? setTheme('dark') : setTheme('light')
                  }}
                ></SwitchRoot>
              </div>
              <div className="flex items-center justify-between">
                <div>Use Device Settings</div>
                <SwitchRoot
                  isCheck={theme === 'system' ? true : false}
                  onSelect={(isSelected: boolean) => {
                    isSelected
                      ? setTheme('system')
                      : setTheme(resolvedTheme === 'dark' ? 'dark' : 'light')
                  }}
                ></SwitchRoot>
              </div>
            </div>
          </SheetContent>
        </SheetRoot>
      </div>
    </>
  )
}

export default ThemeSwitcher
