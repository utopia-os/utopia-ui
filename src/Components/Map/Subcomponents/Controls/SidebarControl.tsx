import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon'

// Converts leaflet.locatecontrol to a React Component
export const SidebarControl = () => {
  return (
    <>
      <div className='tw-card tw-bg-base-100 tw-shadow-xl tw-items-center tw-justify-center  hover:tw-bg-slate-300 hover:tw-cursor-pointer tw-transition-all tw-duration-300 tw-mr-2 tw-h-12 tw-w-12 '>
        <div className='tw-card-body tw-card tw-p-0'>
          <button
            className='tw-btn tw-btn-square tw-btn-ghost tw-rounded-2xl'
            data-te-sidenav-toggle-ref
            data-te-target='#sidenav'
            aria-controls='#sidenav'
            aria-haspopup='true'
          >
            <Bars3Icon className='tw-inline-block tw-w-5 tw-h-5 tw-stroke-current' />
          </button>
        </div>
      </div>
    </>
  )
}
