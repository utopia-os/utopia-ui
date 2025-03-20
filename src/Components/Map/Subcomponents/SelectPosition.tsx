/* eslint-disable @typescript-eslint/no-unsafe-call */
export const SelectPosition = ({ setSelectNewItemPosition }: { setSelectNewItemPosition }) => {
  return (
    <div className='tw:animate-pulseGrow tw-button tw:z-1000 tw:absolute tw:right-5 tw:top-4 tw:drop-shadow-md'>
      <label
        className='tw-btn tw-btn-sm tw:rounded-2xl tw-btn-circle tw-btn-ghost tw:hover:bg-transparent tw:absolute tw:right-0 tw:top-0 tw:text-gray-600'
        onClick={() => {
          setSelectNewItemPosition(null)
        }}
      >
        <p className='tw:text-center '>✕</p>
      </label>
      <div className='tw-alert tw:bg-base-100 tw:text-base-content'>
        <div>
          <span className='tw:text-lg'>Select position on the map!</span>
        </div>
      </div>
    </div>
  )
}
