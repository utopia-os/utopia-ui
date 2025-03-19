import type { Item } from '#types/Item'

export const CrowdfundingView = ({ item }: { item: Item }) => {
  return (
    <div className='tw-mx-6 tw-mb-6'>
      <div className='tw-card tw-bg-base-200 tw-w-fit tw-shadow-xl'>
        <div className='tw-stats tw-bg-base-300'>
          <div className='tw-stat'>
            <div className='tw-stat-title'>Received</div>
            <div className='tw-stat-value'>$89,400</div>
            <div className='tw-stat-desc'>from 12 patrons</div>
          </div>

          <div className='tw-stat'>
            <button className='tw-btn tw-btn-primary tw-place-self-center tw-text-white'>
              Support {item.name}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
