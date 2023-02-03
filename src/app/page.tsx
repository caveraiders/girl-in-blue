import ThemeSwitcher from '@/components/ThemeSwitcher'

export default function Home() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
      <div>
        <ThemeSwitcher></ThemeSwitcher>
      </div>
    </h1>
  )
}
