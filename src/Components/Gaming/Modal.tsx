import { useEffect } from 'react'

/**
 * @category Gaming
 */
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {/* You can open the modal using ID.showModal() method */}
      <dialog id='my_modal_3' className='tw-modal tw:transition-all tw:duration-300'>
        <form method='dialog' className='tw-modal-box tw:transition-none'>
          <button className='tw-btn tw-btn-sm tw-btn-circle tw-btn-ghost tw:absolute tw:right-2 tw:top-2 tw:focus:outline-hidden'>
            ✕
          </button>
          {children}
        </form>
        <form method='dialog' className='tw-modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}
