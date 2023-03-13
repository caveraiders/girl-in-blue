'use client'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { useState } from 'react'
import Button from './Button'
import ThemeSwitcher from './ThemeSwitcher'
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid'
import Sheet, { SheetClose } from './Sheet'
import Setting from './Setting'

type Nav = {
  href: string
  label: string
  name: string
  icon: JSX.Element
}
type NavbarProps = {
  navs: Nav[]
}

const NavbarContent = ({ navs, segment }: { navs: Nav[]; segment: any }) => {
  return (
    <>
      <div className="flex flex-1 flex-col gap-2">
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
              className={`flex items-center gap-2 rounded-full py-2 px-3 hover:bg-sky-50 hover:text-sky-500 hover:dark:bg-sky-900/50 hover:dark:text-sky-200 ${
                isActive
                  ? 'bg-sky-50 text-sky-500 dark:bg-sky-900/50 dark:text-sky-200'
                  : 'text-slate-800 dark:text-slate-300'
              }`}
            >
              {nav.icon}
              {nav.name}
            </Link>
          )
        })}
      </div>
      <div className="flex w-full flex-col gap-2">
        <ThemeSwitcher />
        <Setting />
      </div>
    </>
  )
}

const Navbar = ({ navs }: NavbarProps) => {
  const segment = useSelectedLayoutSegment()
  const [openSheet, setOpenSheet] = useState<boolean>(false)

  return (
    <>
      <nav className="flex w-full justify-end lg:hidden">
        <Sheet
          open={openSheet}
          onOpenChange={() => setOpenSheet(!openSheet)}
          trigger={
            <Button isOnlyIcon variant="text" appearance="secondary">
              <Bars3BottomRightIcon className="h-6 w-6" />
            </Button>
          }
          direction="right"
          height="h-full"
          width="w-5/6"
          zIndex="z-40"
        >
          <div className="flex h-full flex-col justify-between gap-8 p-10">
            <SheetClose asChild>
              <Button isOnlyIcon variant="text" appearance="secondary">
                <XMarkIcon className="h-6 w-6" />
              </Button>
            </SheetClose>
            <NavbarContent navs={navs} segment={segment} />
          </div>
        </Sheet>
      </nav>
      <nav className="hidden w-full flex-col justify-center gap-2 py-10 lg:flex">
        <NavbarContent navs={navs} segment={segment} />
      </nav>
    </>
  )
}

export default Navbar
