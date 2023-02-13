import Link from 'next/link'
import Logo from './Logo'
import Navbar from '@/components/Navbar'
import ThemeSwitcher from './ThemeSwitcher'
import {
  HomeIcon,
  BoltIcon,
  UsersIcon,
  InboxIcon,
} from '@heroicons/react/24/solid'

type Nav = {
  href: string
  label: string
  name: string
  icon: JSX.Element
}

const navs: Nav[] = [
  {
    href: '/',
    label: 'home',
    name: 'ホーム',
    icon: <HomeIcon className="h-6 w-6" />,
  },
  {
    href: '/weapons',
    label: 'weapons',
    name: '武器',
    icon: <BoltIcon className="h-6 w-6" />,
  },
  {
    href: '/characters',
    label: 'characters',
    name: 'キャラクター',
    icon: <UsersIcon className="h-6 w-6" />,
  },
  {
    href: '/items',
    label: 'items',
    name: 'アイテム',
    icon: <InboxIcon className="h-6 w-6" />,
  },
]

export default function Header() {
  return (
    <>
      <header className="sticky top-0 left-0 z-40 flex w-full items-center justify-between border-b border-slate-100 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-900">
        <h1>
          <Link href="/">
            <Logo />
          </Link>
        </h1>
        <Navbar navs={navs} />
        <div className="hidden lg:flex lg:gap-3">
          <ThemeSwitcher />
        </div>
      </header>
    </>
  )
}
