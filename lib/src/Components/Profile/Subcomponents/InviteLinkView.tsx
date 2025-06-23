import { TextView } from '#components/Map/Subcomponents/ItemPopupComponents'

import type { Item } from '#types/Item'

export const InviteLinkView = ({ item }: { item: Item }) => {
  // TODO Only show if user has permission to view secrets.
  // usePermission() seems to be useful.

  if (!item.secrets || item.secrets.length === 0) {
    console.log('No secrets found for item', item.id)
    // Generate a new secret if none exists?
    return
  }
  const link = `${window.location.origin}/invite/${item.secrets[0].secret}`

  return (
    <div className='tw:my-10 tw:mt-2 tw:px-6'>
      <h2 className='tw:text-lg tw:font-semibold'>Invite</h2>
      <div className='tw:mt-2 tw:text-sm'>
        <input
          type='text'
          value={link}
          readOnly
          className='tw:w-full tw:mb-2 tw:p-2 tw:border tw:rounded'
        />
      </div>
    </div>
  )
}
