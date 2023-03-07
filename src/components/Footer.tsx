export default function Footer() {
  return (
    <footer className="flex h-24 w-full items-center justify-between space-y-1 border-t border-slate-200 bg-white px-6 text-center text-xs leading-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="container mx-auto flex flex-col gap-1 px-4">
        <p>©&nbsp;Cygames,&nbsp;Inc.</p>
        <p>
          当サイト上で使用しているゲーム画像の著作権および商標権、その他知的財産権は、当該コンテンツの提供元に帰属します。
        </p>
      </div>
    </footer>
  )
}
