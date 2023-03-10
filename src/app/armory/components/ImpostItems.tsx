'use client'
import ScrollArea from '@/components/ScrollArea'
import Sheet, { SheetHeader } from '@/components/Sheet'
import ToastContext from '@/contexts/ToastContext'
import WeaponContext from '@/contexts/WeaponContext'
import { WeaponContextProps } from '@/types/Weapon'
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline'
import React, { useContext, useRef, useState } from 'react'
import { useCopyToClipboard } from 'react-use'
import Button from '../../../components/Button'

interface Item {
  itemId: string
  ownedQuantity: number
}

const ImpostItems: React.FC = () => {
  const { setToast } = useContext(ToastContext)
  const { openImpostItemsSheet, setOpenImpostItemsSheet, myItems, setMyItems } =
    useContext<WeaponContextProps>(WeaponContext)
  const [isValidJson, setIsValidJson] = useState<boolean>(true)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [state, copyToClipboard] = useCopyToClipboard()

  const handleButtonClick = () => {
    if (textAreaRef.current) {
      const inputValue = textAreaRef.current.value
      try {
        const parsedItems = JSON.parse(inputValue) as Item[]
        setMyItems(parsedItems)
        setIsValidJson(true)
        setOpenImpostItemsSheet(false)
      } catch (error) {
        console.error('Invalid JSON input', error)
        setIsValidJson(false)
      }
    }
  }

  return (
    <div>
      <Sheet
        open={openImpostItemsSheet}
        onOpenChange={setOpenImpostItemsSheet}
        width="w-full"
        height="h-5/6"
        zIndex="z-40"
        direction="bottom"
      >
        <div className="flex h-full flex-col">
          <SheetHeader
            title="データインポート"
            onClick={() => setOpenImpostItemsSheet(false)}
          />
          <div className="flex h-full w-full flex-1 flex-col overflow-hidden">
            <ScrollArea>
              <div className="grid grid-cols-1 gap-8 p-6">
                <div>
                  <div className="mb-4">第1步：复制代码</div>
                  <div>
                    <Button
                      variant="filled"
                      appearance="primary"
                      onClick={() => {
                        copyToClipboard('wqwww')
                        state.error
                          ? setToast({
                              isOpen: true,
                              title: '复制失败',
                              description: state.error?.message,
                              type: 'error',
                            })
                          : setToast({
                              isOpen: true,
                              title: '复制成功',
                              description: '代码已成功复制，你可以进行下一步。',
                            })
                      }}
                    >
                      <ClipboardDocumentIcon className="h-5 w-5" />
                      コードをコピーする
                    </Button>
                  </div>
                </div>
                <div>
                  <div className="mb-4">第2步：生成 JSON 数据</div>
                  <div></div>
                </div>
                <div>
                  <div className="mb-4">第3步：粘贴 JSON 数据</div>
                  <div>
                    <textarea
                      defaultValue={JSON.stringify(myItems) || ''}
                      placeholder="Paste JSON data here"
                      className="h-96 w-full rounded-lg border border-slate-700 p-4 text-sm focus:border-sky-400 dark:border-slate-600 dark:bg-slate-800 dark:placeholder-slate-600 dark:ring-slate-700 dark:focus:border-sky-400"
                      ref={textAreaRef}
                    />
                    {!isValidJson && (
                      <div className="text-red-600">
                        JSONの形式が誤っています,再度入力してください。
                      </div>
                    )}
                  </div>
                </div>
                <div></div>
              </div>
            </ScrollArea>
          </div>
          <footer className="flex gap-4 border-t border-slate-100 p-4 dark:border-slate-800">
            <Button
              isFullWidth
              variant="outlined"
              appearance="secondary"
              onClick={() => {
                setOpenImpostItemsSheet(false)
                setIsValidJson(true)
              }}
            >
              キャンセル
            </Button>

            <Button
              isFullWidth
              variant="filled"
              appearance="primary"
              onClick={() => {
                handleButtonClick()
              }}
            >
              OK
            </Button>
          </footer>
        </div>
      </Sheet>
    </div>
  )
}

export default ImpostItems
