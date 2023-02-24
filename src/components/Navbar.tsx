'use client'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { useState } from 'react'
import Button from './Button'
import { SheetClose, SheetContent, SheetRoot, SheetTrigger } from './Sheet'
import ThemeSwitcher from './ThemeSwitcher'
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid'

type Nav = {
  href: string
  label: string
  name: string
  icon: JSX.Element
}
type NavbarProps = {
  navs: Nav[]
}
const Navbar = ({ navs }: NavbarProps) => {
  const segment = useSelectedLayoutSegment()
  const [sheetOpen, setSheetOpen] = useState<boolean>(false)

  return (
    <>
      <div className="lg:hidden">
        <SheetRoot open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button isOnlyIcon variant="text" appearance="secondary">
              <Bars3BottomRightIcon className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            position="right"
            height="h-full"
            width="w-5/6"
            isOpen={sheetOpen}
            zIndex="z-40"
          >
            <div className="flex h-full flex-col justify-between gap-8 p-10">
              <SheetClose asChild>
                <Button isOnlyIcon variant="text" appearance="secondary">
                  <XMarkIcon className="h-6 w-6" />
                </Button>
              </SheetClose>
              <div className="flex flex-col gap-6">
                {navs.map((nav: Nav) => {
                  let isActive: boolean
                  if (segment === null && nav.label === 'home') {
                    isActive = true
                  } else {
                    isActive = segment === nav.label.toLocaleLowerCase()
                  }

                  return (
                    <Link
                      key={nav.label}
                      href={nav.href}
                      className="flex items-center gap-4"
                      onClick={() => setSheetOpen(false)}
                    >
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full p-1 ${
                          isActive
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-sky-50'
                            : 'bg-gradient-to-r from-slate-800 to-slate-700 text-white'
                        }`}
                      >
                        {nav.icon}
                      </div>
                      <div
                        className={`text-lg font-bold ${
                          isActive
                            ? 'text-sky-500'
                            : 'text-slate-800 dark:text-slate-300'
                        }`}
                      >
                        {nav.name}
                      </div>
                    </Link>
                  )
                })}
              </div>
              <Button variant="text" appearance="primary" isOnlyIcon>
                <ThemeSwitcher />
              </Button>
            </div>
          </SheetContent>
        </SheetRoot>
      </div>
      <nav className="hidden items-center justify-center gap-2 px-4 lg:flex">
        {navs.map((nav: Nav) => {
          let isActive: boolean
          if (segment === null && nav.label === 'home') {
            isActive = true
          } else {
            isActive = segment === nav.label.toLocaleLowerCase()
          }

          return (
            <Link
              key={nav.label}
              href={nav.href}
              className="flex flex-col items-center gap-1"
            >
              <Button
                appearance={isActive ? 'primary' : 'secondary'}
                variant="text"
              >
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full p-1 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-sky-50'
                      : 'bg-gradient-to-r from-slate-800 to-slate-700 text-white'
                  }`}
                >
                  {nav.icon}
                </div>
                <div
                  className={`text font-bold ${
                    isActive
                      ? 'text-sky-500'
                      : 'text-slate-800 dark:text-slate-300'
                  }`}
                >
                  {nav.name}
                </div>
              </Button>
            </Link>
          )
        })}
      </nav>
    </>
  )
}

export default Navbar
