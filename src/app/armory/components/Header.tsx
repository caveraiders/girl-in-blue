'use client'

import Button from '@/components/Button'
import WeaponContext from '@/contexts/WeaponContext'
import { WeaponContextProps } from '@/types/Weapon'
import {
  CodeBracketIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { useContext } from 'react'

const Header = () => {
  const { selectedWeapons, setSelectedWeapons, setOpenAddWeaponsSheet } =
    useContext<WeaponContextProps>(WeaponContext)
  return (
    <header className="flex flex-wrap justify-between gap-4">
      <div className="text-2xl">武器庫</div>
      <div className="flex items-center justify-center gap-4 sm:justify-start">
        <div className="hidden md:block">
          <Button appearance="secondary">
            <CodeBracketIcon className="h-4 w-4" />
            アイテム所持数をインポート
          </Button>
        </div>
        <Button
          appearance="danger"
          variant="outlined"
          isDisabled={selectedWeapons?.length === 0}
        >
          <TrashIcon className="h-4 w-4" />
          すべてクリア
        </Button>
        <Button
          appearance="primary"
          onClick={() => setOpenAddWeaponsSheet(true)}
        >
          <PlusIcon className="h-4 w-4" />
          武器の追加
        </Button>
      </div>
    </header>
  )
}

export default Header
