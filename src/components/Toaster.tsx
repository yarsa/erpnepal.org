import { Toast } from '@base-ui/react/toast'
import { useEffect } from 'react'

// Loaded on the first copy click only, so the toast code stays out of the page's initial download.
const manager = Toast.createToastManager()

function Viewport() {
  const { toasts } = Toast.useToastManager()
  return (
    <Toast.Portal>
      <Toast.Viewport className="fixed right-4 bottom-4 z-50 flex w-72 flex-col gap-2">
        {toasts.map((toast) => (
          <Toast.Root
            key={toast.id}
            toast={toast}
            className="rounded-2xl bg-inverse px-4 py-3 text-on-inverse text-sm shadow-lg transition-[opacity,translate] data-ending-style:opacity-0 data-starting-style:translate-y-2 data-starting-style:opacity-0"
          >
            <Toast.Title />
          </Toast.Root>
        ))}
      </Toast.Viewport>
    </Toast.Portal>
  )
}

/** Shows `note.text` as a toast each time `note.id` changes. */
export default function Toaster({ note }: { note: { id: number; text: string } }) {
  useEffect(() => {
    manager.add({ title: note.text })
  }, [note])
  return (
    <Toast.Provider toastManager={manager} timeout={2500}>
      <Viewport />
    </Toast.Provider>
  )
}
