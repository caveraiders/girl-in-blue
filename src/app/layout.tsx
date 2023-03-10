import ScrollTop from '@/components/ScrollTop'
import Header from '@/components/Header'
import { ThemeProvider } from '@/providers/ThemeProvider'
import ToastProvider from '@/providers/ToastProvider'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-300 lg:h-screen">
        <ThemeProvider>
          <ToastProvider>
            <Header />
            <div className="lg:ml-60">
              <div className="p-4">{children}</div>
            </div>
            <ScrollTop />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
