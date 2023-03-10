import * as RadixUiScrollArea from '@radix-ui/react-scroll-area'

type ScrollAreaProps = {
  children: React.ReactNode
}

const ScrollArea = ({ children }: ScrollAreaProps) => (
  <RadixUiScrollArea.Root className="h-full w-full overflow-hidden bg-transparent">
    <RadixUiScrollArea.Viewport className="h-full w-full">
      {children}
    </RadixUiScrollArea.Viewport>
    <RadixUiScrollArea.Scrollbar
      className="flex touch-none select-none bg-slate-100 p-0.5 transition-colors duration-[160ms] ease-out hover:bg-slate-200 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col dark:bg-transparent/20"
      orientation="vertical"
    >
      <RadixUiScrollArea.Thumb className="relative flex-1 rounded-lg bg-slate-400 before:absolute before:top-1/2 before:left-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] dark:bg-slate-700" />
    </RadixUiScrollArea.Scrollbar>
    <RadixUiScrollArea.Scrollbar
      className="flex touch-none select-none bg-slate-100 p-0.5 transition-colors duration-[160ms] ease-out hover:bg-slate-200 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col dark:bg-transparent/20"
      orientation="horizontal"
    >
      <RadixUiScrollArea.Thumb className="relative flex-1 rounded-lg bg-slate-400 before:absolute before:top-1/2 before:left-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] dark:bg-slate-700" />
    </RadixUiScrollArea.Scrollbar>
    <RadixUiScrollArea.Corner className="bg-slate-900" />
  </RadixUiScrollArea.Root>
)

export default ScrollArea
