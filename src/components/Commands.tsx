import { IconCopy } from '@tabler/icons-react'
import { lazy, Suspense, useState } from 'react'
import { useStrings } from '../lib/i18n'
import { Button } from './ui/button'

const Toaster = lazy(() => import('./Toaster'))

export function Commands({ className }: { className?: string }) {
  const { t } = useStrings()
  const g = t.getStarted.technical
  const [note, setNote] = useState<{ id: number; text: string } | null>(null)
  async function copy(command: string) {
    let text = g.copied
    try {
      await navigator.clipboard.writeText(command)
    } catch {
      text = g.copyFailed
    }
    setNote({ id: Date.now(), text })
  }
  return (
    <>
      <div className={`inverse inverse-black overflow-hidden rounded-lg border border-line bg-surface ${className ?? ''}`}>
        <div className="flex gap-1.5 border-line border-b px-3 py-3" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
        </div>
        <div className="divide-y divide-line">
          {g.commands.map((command) => (
            <div key={command} className="flex items-center gap-2 py-1.5 pr-1.5 pl-4">
              <pre className="min-w-0 flex-1 overflow-x-auto py-1.5 font-mono text-fg text-sm leading-6 [scrollbar-width:none]">
                <code>
                  <span className="select-none text-fg-3" aria-hidden="true">
                    ${' '}
                  </span>
                  {command}
                </code>
              </pre>
              <Button
                size="icon"
                variant="ghost"
                className="shrink-0"
                aria-label={`${g.copy}: ${command}`}
                title={g.copy}
                onClick={() => copy(command)}
              >
                <IconCopy className="size-4" aria-hidden="true" />
              </Button>
            </div>
          ))}
        </div>
      </div>
      {note && (
        <Suspense fallback={null}>
          <Toaster note={note} />
        </Suspense>
      )}
    </>
  )
}
