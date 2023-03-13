'use client'
import ToastContext from '@/contexts/ToastContext'
import { Cog6ToothIcon } from '@heroicons/react/24/solid'
import { useContext, useEffect, useRef, useState } from 'react'
import { useLocalStorage } from 'react-use'
import Button from './Button'
import Sheet, { SheetHeader } from './Sheet'

const Setting = () => {
  const { setToast } = useContext(ToastContext)
  const [open, setOpen] = useState<boolean>(false)
  const [isValid, setIsValid] = useState<boolean>(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const [uid, setUid] = useLocalStorage<string>('uid', '')
  const [inputValue, setInputValue] = useState(uid || '')

  useEffect(() => {
    setUid(inputValue)
  }, [inputValue])

  const handleButtonClick = () => {
    if (inputRef.current) {
      const inputValue = inputRef.current.value
      if (/^[0-9]+$/.test(inputValue)) {
        setInputValue(inputValue)
        setOpen(false)
        setToast({
          isOpen: true,
          title: '通知',
          description: '正常に設定されました',
        })
      } else {
        setIsValid(false)
      }
    }
  }

  useEffect(() => {
    setIsValid(true)
  }, [open])

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="flex cursor-pointer items-center gap-2 rounded-full py-2 px-3 hover:bg-sky-50 hover:text-sky-500 hover:dark:bg-sky-900/50 hover:dark:text-sky-200"
      >
        <Cog6ToothIcon className="h-5 w-5" />
        設定
      </div>
      <Sheet
        open={open}
        onOpenChange={setOpen}
        width="w-80"
        height="h-[240px]"
        zIndex="z-50"
        direction="center"
      >
        <div className="flex h-full flex-col">
          <SheetHeader title="UIDの設定" onClick={() => setOpen(false)} />
          <div className="space-y-1 p-4">
            <input
              type="text"
              placeholder="uid"
              ref={inputRef}
              defaultValue={inputValue}
              className="h-12 w-full rounded-lg border border-slate-700 p-4 text-sm focus:border-sky-400 dark:border-slate-600 dark:bg-slate-800 dark:placeholder-slate-600 dark:ring-slate-700 dark:focus:border-sky-400"
            />
            {!isValid && <p className="text-xs text-red-400">*UID只能是数字</p>}
          </div>
          <footer className="flex gap-4 border-t border-slate-100 p-4 dark:border-slate-800">
            <Button
              isFullWidth
              variant="outlined"
              appearance="secondary"
              onClick={() => {
                setOpen(false)
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
    </>
  )
}

export default Setting
