import { Context, createContext } from 'react'

const ToastContext = createContext<any>({
  setToast: () => {},
})

export default ToastContext
