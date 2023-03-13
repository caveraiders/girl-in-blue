import Link from 'next/link'
import Logo from './Logo'
import Navbar from '@/components/Navbar'
import ThemeSwitcher from './ThemeSwitcher'
import {
  HomeIcon,
  CpuChipIcon,
  StarIcon,
  BoltIcon,
  CubeIcon,
} from '@heroicons/react/24/solid'
import Setting from './Setting'

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
    icon: <CpuChipIcon className="h-6 w-6" />,
  },
  {
    href: '/weapons',
    label: 'weapons',
    name: '武器',
    icon: <BoltIcon className="h-6 w-6" />,
  },
  {
    href: '/items',
    label: 'items',
    name: 'アイテム',
    icon: <CubeIcon className="h-6 w-6" />,
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
    <header className="sticky top-0 left-0 z-40 flex h-20 w-full border-b border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800 lg:fixed lg:h-full lg:w-60 lg:flex-col lg:border-r">
      <h1 className="flex-1 px-3 lg:flex-none">
        <Link href="/">
          <Logo />
        </Link>
      </h1>
      <div className="flex flex-1">
        <Navbar navs={navs} />
      </div>
    </header>
  )
}
