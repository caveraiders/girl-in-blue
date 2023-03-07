import Link from 'next/link'
import Logo from './Logo'
import Navbar from '@/components/Navbar'
import ThemeSwitcher from './ThemeSwitcher'
import {
  HomeIcon,
  BoltIcon,
  CircleStackIcon,
  StarIcon,
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
    href: '/armory',
    label: 'armory',
    name: '武器庫',
    icon: <BoltIcon className="h-6 w-6" />,
  },
  {
    href: '/database',
    label: 'database',
    name: 'データベース',
    icon: <CircleStackIcon className="h-6 w-6" />,
  },
  {
    href: '/resources',
    label: 'resources',
    name: 'リソース',
    icon: <StarIcon className="h-6 w-6" />,
  },
]

export default function Header() {
  return (
    <>
      <header className="sticky top-0 left-0 z-40 flex h-24 w-full items-center justify-between border-b border-slate-200 bg-white/90 px-6 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900">
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
