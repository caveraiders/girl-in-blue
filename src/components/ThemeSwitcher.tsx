'use client'
import { useTheme } from 'next-themes'
import Sheet from '@/components/Sheet'
import { SwitchRoot } from './Switch'
import { useState } from 'react'
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRoot,
  MenubarTrigger,
} from './Menubar'
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/solid'

const ThemeSwitcher = () => {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const initalThemes: string[] = ['light', 'dark', 'system']
  const [openSheet, setOpenSheet] = useState<boolean>(false)
  return (
    <>
      <MenubarRoot className="hidden md:flex">
        <MenubarMenu>
          <MenubarTrigger className="w-full outline-none">
            <div className="flex w-full cursor-pointer items-center gap-2 rounded-full py-2 px-3 hover:bg-sky-50 hover:text-sky-500 hover:dark:bg-sky-900/50 hover:dark:text-sky-200">
              <div className="flex gap-2 dark:hidden">
                <SunIcon className="h-5 w-5 text-sky-500 " />
                ライトモード
              </div>
              <div className="hidden gap-2 dark:flex">
                <MoonIcon className="h-5 w-5 text-sky-500 " />
                ダークモード
              </div>
            </div>
          </MenubarTrigger>
          <MenubarContent>
            {initalThemes.map((item) => (
              <MenubarItem
                key={item}
                onSelect={() => setTheme(item)}
                isSlected={item === theme}
              >
                {item === 'light' ? (
                  <SunIcon className="h-4 w-4 " />
                ) : item === 'dark' ? (
                  <MoonIcon className="h-4 w-4" />
                ) : (
                  <ComputerDesktopIcon className="h-4 w-4" />
                )}
                <span className="ml-3 capitalize">{item}</span>
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>
      </MenubarRoot>

      <div className="md:hidden">
        <Sheet
          open={openSheet}
          onOpenChange={() => setOpenSheet(!openSheet)}
          trigger={
            <div className="flex w-full cursor-pointer items-center gap-2 rounded-full py-2 px-3 hover:bg-sky-50 hover:text-sky-500 hover:dark:bg-sky-900/50 hover:dark:text-sky-200">
              <div className="flex gap-2 dark:hidden">
                <SunIcon className="h-5 w-5 text-sky-500 " />
                ライトモード
              </div>
              <div className="hidden gap-2 dark:flex">
                <MoonIcon className="h-5 w-5 text-sky-500 " />
                ダークモード
              </div>
            </div>
          }
          width="w-full"
          height="h-auto"
          direction="bottom"
          zIndex="z-50"
        >
          <div className="flex justify-center py-3 font-bold">Dark mode</div>
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
        </Sheet>
      </div>
    </>
  )
}

export default ThemeSwitcher
