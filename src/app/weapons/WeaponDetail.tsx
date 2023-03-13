import Button from '@/components/Button'
import Image from 'next/image'
import Link from 'next/link'
import { CheckBadgeIcon, StarIcon } from '@heroicons/react/24/solid'
import { Weapon } from '@/types/Weapon'
import { Item } from '@/types/Item'
import StarRating from '@/components/StarRating'
import { useContext } from 'react'
import ToastContext from '@/contexts/ToastContext'
import OtherSite from './components/OtherSite'

type WeaponDetailProps = {
  currentWeapon: Weapon
  weaponElements: string[]
  weaponTypes: string[]
  itemList: Item[]
}

const WeaponDetail = ({
  currentWeapon,
  weaponElements,
  weaponTypes,
  itemList,
}: WeaponDetailProps) => {
  const { weaponId, jpName, breakLimit, items, gwId, gbfwikiEnId, series } =
    currentWeapon
  const { setToast } = useContext(ToastContext)
  const uid = localStorage.getItem('uid')

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 flex-col gap-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div>
            <Image
              src={`/images/weapons/m_${weaponId}.jpg`}
              width={280}
              height={160}
              alt={jpName}
            />
          </div>
          <div className="flex w-full flex-1 flex-col gap-3">
            {series && (
              <div>
                <span className="rounded-full bg-slate-100 px-1 py-0.5 text-xs text-slate-400 dark:bg-slate-800 dark:ring-1 dark:ring-slate-400/10">
                  {series}
                </span>
              </div>
            )}

            <h2 className="flex items-center gap-2 text-xl font-bold">
              {jpName}
              <CheckBadgeIcon className="h-5 w-5 text-sky-500" />
            </h2>
            {breakLimit && (
              <div className="flex items-center">
                <StarRating breakLimit={breakLimit} />
              </div>
            )}
            <div className="flex flex-wrap items-center gap-4">
              {uid ? (
                <OtherSite
                  link={`https://game.granbluefantasy.jp/#archive/detail_weapon/${uid}/${
                    weaponTypes.findIndex(
                      (element) => element === currentWeapon.type,
                    ) + 1
                  }/${
                    weaponElements.findIndex(
                      (element) => element === currentWeapon.element,
                    ) + 1
                  }/3/${currentWeapon.weaponId}/1/0`}
                  name="GBF"
                  icon="/images/logos/gbfwiki_cn.png"
                  isDisabled={false}
                  size="md"
                />
              ) : (
                <Button
                  appearance="secondary"
                  size="md"
                  variant="outlined"
                  onClick={() =>
                    setToast({
                      isOpen: true,
                      title: 'ページジャンプに失敗する',
                      description:
                        'UIDが空です。ゲームにアクセスしてUIDをコピーし、当サイトの設定で貼り付けてください。',
                      type: 'error',
                    })
                  }
                >
                  <Image
                    src={`/images/logos/gbfwiki_cn.png`}
                    width={20}
                    height={20}
                    alt={jpName}
                    className="rounded-full"
                  />
                  GBF
                </Button>
              )}

              <OtherSite
                link={`https://xn--bck3aza1a2if6kra4ee0hf.gamewith.jp/article/show/${gwId}.webp`}
                name="Gamewith"
                icon="/images/logos/gamewith.webp"
                isDisabled={gwId ? false : true}
                size="md"
              />
              <OtherSite
                link={`https://kamigame.jp/%E3%82%B0%E3%83%A9%E3%83%96%E3%83%AB/%E6%AD%A6%E5%99%A8/SSR/${jpName}.html`}
                name="Kamigame"
                icon="/images/logos/kamigame.png"
                isDisabled={jpName ? false : true}
                size="md"
              />
              <OtherSite
                link={`https://gbf.wiki/${gbfwikiEnId}`}
                name="GBF Wiki"
                icon="/images/logos/gbfwiki_en.png"
                isDisabled={gbfwikiEnId ? false : true}
                size="md"
              />
              <OtherSite
                link={`https://gbf.huijiwiki.com/wiki/Weapon/${weaponId}`}
                name="中文维基"
                icon="/images/logos/gbfwiki_cn.png"
                isDisabled={weaponId ? false : true}
                size="md"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold">上限解放</h3>
          <div className="grid w-full grid-cols-1 gap-4">
            {items
              ?.filter((item: any) => item.type === 'uncap')
              ?.map((item: any, itemIndex: number) => (
                <div className="flex flex-col gap-4" key={itemIndex}>
                  <h4 className="font-bold">{item.title}</h4>

                  <table className="w-full table-auto border-collapse border border-slate-300 text-sm dark:border-slate-700">
                    {item?.requiredItems.length > 0 && (
                      <thead className="dark:bg-slate-800">
                        <tr>
                          {item?.requiredItems[0]?.element && (
                            <th className="border border-slate-300 p-2 dark:border-slate-700">
                              属性
                            </th>
                          )}
                          <th className="border border-slate-300 p-2 dark:border-slate-700">
                            素材
                          </th>
                          <th className="border border-slate-300 p-2 dark:border-slate-700">
                            必要数
                          </th>
                        </tr>
                      </thead>
                    )}
                    <tbody>
                      {item.requiredItems?.map(
                        (requireditem: any, requireditemIndex: any) => {
                          const itemId = itemList.find(
                            (itemListItem) =>
                              itemListItem.name === requireditem.name,
                          )?.itemId
                          return (
                            <tr key={requireditemIndex}>
                              {requireditem.name && (
                                <>
                                  <td className="border border-slate-300 p-2 text-left dark:border-slate-700">
                                    <div className="flex items-center gap-1.5">
                                      <Image
                                        src={
                                          itemId
                                            ? `/images/items/s_${itemId}.jpg`
                                            : `/images/items/default.jpg`
                                        }
                                        width={32}
                                        height={32}
                                        alt={requireditem.name}
                                      />
                                      <div className="w-full flex-1">
                                        {requireditem.name}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="border border-slate-300 p-2 text-center dark:border-slate-700">
                                    {requireditem.requiredAmount}
                                  </td>
                                </>
                              )}
                              {requireditem.element && (
                                <>
                                  <td className="border border-slate-300 p-2 text-center dark:border-slate-700">
                                    {requireditem.element}
                                  </td>
                                  <td className="border border-slate-300 p-2 text-left dark:border-slate-700">
                                    {requireditem?.items.map(
                                      (item: any, index: any) => {
                                        const elementItemId = itemList.find(
                                          (itemListItem) =>
                                            itemListItem.name === item.name,
                                        )?.itemId
                                        return (
                                          <div
                                            className="flex items-center gap-1.5 pt-2 pb-2 first:pt-0 last:pb-0"
                                            key={index}
                                          >
                                            <Image
                                              src={
                                                elementItemId
                                                  ? `/images/items/s_${elementItemId}.jpg`
                                                  : `/images/items/default.jpg`
                                              }
                                              width={32}
                                              height={32}
                                              alt={item.name}
                                            />
                                            <div className="w-full flex-1">
                                              {item.name}
                                            </div>
                                          </div>
                                        )
                                      },
                                    )}
                                  </td>
                                  <td className="border border-slate-300 p-2 text-center dark:border-slate-700">
                                    {requireditem?.items.map(
                                      (item: any, index: any) => (
                                        <div
                                          key={index}
                                          className="pt-2 pb-2 first:pt-0 last:pb-0"
                                        >
                                          {item.requiredAmount}
                                        </div>
                                      ),
                                    )}
                                  </td>
                                </>
                              )}
                            </tr>
                          )
                        },
                      )}
                      {item.length === 0 ||
                        (item?.requiredItems.length === 0 && (
                          <div className="flex items-center justify-center px-4 py-8 text-lg">
                            準備中
                          </div>
                        ))}
                    </tbody>
                  </table>
                </div>
              ))}
            {items.length === 0 && (
              <div className="w-full table-auto border-collapse border border-slate-300 text-sm dark:border-slate-700">
                <div className="flex items-center justify-center px-4 py-8 text-lg">
                  準備中
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeaponDetail
