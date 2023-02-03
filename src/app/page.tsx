import ThemeToggle from '@/components/ThemeToggle'

export default function Home() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
      <div>
        <ThemeToggle></ThemeToggle>
      </div>
    </h1>
  )
}
