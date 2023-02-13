import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { ThemeProvider } from '@/components/ThemeProvider'
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
      <body className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-400">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <div className="container mx-auto flex-1 px-4 py-10">
              {children}
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
