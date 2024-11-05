/* eslint-disable camelcase */
import { Item } from '../../../types'
import SocialShareBar from './SocialShareBar'

const statusMapping = {
  in_planning: 'in Planung',
  paused: 'pausiert',
  active: 'aktiv',
}

export const GroupSubHeaderView = ({
  item,
  share_base_url,
}: {
  item: Item
  share_base_url: string
}) => (
  <div className='tw-px-6'>
    <div className='tw-float-left tw-mt-2 tw-mb-4 tw-flex tw-items-center'>
      {item.status && (
        <div className='tw-mt-1.5'>
          <span className='tw-text-sm tw-text-current tw-bg-base-300 tw-rounded tw-py-0.5 tw-px-2 tw-inline-flex tw-items-center tw-mr-2'>
            <span
              className={`tw-w-2 tw-h-2  ${item.status === 'in_planning' && 'tw-bg-blue-700'} ${item.status === 'paused' && 'tw-bg-orange-400'} ${item.status === 'active' && 'tw-bg-green-500'} tw-rounded-full tw-mr-1.5`}
            ></span>
            {statusMapping[item.status]}
          </span>
        </div>
      )}
      {item.group_type && (
        <div className='tw-mt-1.5'>
          <span className='tw-text-sm tw-text-current tw-bg-base-300 tw-rounded tw-py-1 tw-px-2'>
            {item.group_type}
          </span>
        </div>
      )}
    </div>
    <div>
      <SocialShareBar url={share_base_url + item.slug} title={item.name} />
    </div>
  </div>
)
