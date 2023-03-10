'use client'
import ToastContext from '@/contexts/ToastContext'
import { useState } from 'react'
import Toast from '@/components/Toast'

type ToastProviderProps = {
  children: React.ReactNode
}

type Toast = {
  isOpen: boolean
  title: string
  description: string
  direction: 'top' | 'center' | 'bottom' | 'right'
  type: 'success' | 'error'
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toast, setToast] = useState<Toast>({
    isOpen: false,
    title: 'Title',
    description: 'Description',
    direction: 'top',
    type: 'success',
  })

  return (
    <ToastContext.Provider value={{ setToast }}>
      <Toast
        title={toast.title}
        description={toast.description}
        direction={toast.direction}
        isOpen={toast.isOpen}
        type={toast.type}
        onOpenChange={(isOpen: boolean) => setToast({ ...toast, isOpen })}
      >
        {children}
      </Toast>
    </ToastContext.Provider>
  )
}

export default ToastProvider
