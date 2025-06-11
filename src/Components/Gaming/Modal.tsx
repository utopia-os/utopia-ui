import { useEffect } from 'react'

export function Modal({
  children,
  showOnStartup,
}: {
  children: React.ReactNode
  showOnStartup?: boolean
}) {
  useEffect(() => {
    if (showOnStartup) {
      window.my_modal_3.showModal()
    }
  }, [showOnStartup])

  return (
    <dialog id='my_modal_3' className='tw:modal tw:transition-all tw:duration-300'>
      <div className='tw:modal-box tw:transition-none'>
        <button
          className='tw:btn tw:btn-sm tw:btn-circle tw:btn-ghost tw:absolute tw:right-2 tw:top-2'
          onClick={() => window.my_modal_3.close()}
        >
          ✕
        </button>
        {children}
      </div>
      <form method='dialog' className='tw:modal-backdrop'>
        <button>close</button>
      </form>
    </dialog>
  )
}
