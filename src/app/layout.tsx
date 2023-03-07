import ScrollTop from '@/components/ScrollTop'
import Footer from '@/components/Footer'
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
      <body className="flex h-screen min-h-screen flex-col bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-300">
        <ThemeProvider>
          <ToastProvider>
            <div>
              <Header />
            </div>
            <div className="flex-1 px-4 py-10 2xl:container 2xl:mx-auto">
              {children}
            </div>
            <div>
              <Footer />
            </div>
            <ScrollTop />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
