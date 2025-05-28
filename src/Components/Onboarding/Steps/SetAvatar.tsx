import { useState } from 'react'

import { AvatarWidget } from '#components/Profile/Subcomponents/AvatarWidget'

export const SetAvatar = () => {
  const [avatar, setAvatar] = useState<string>('')
  return (
    <div>
      <h3 className='tw:text-lg tw:font-bold tw:text-center'>Lade ein Bild von dir hoch</h3>
      <div className='tw:mt-4 tw:flex tw:justify-center tw:items-center'>
        <AvatarWidget avatar={avatar} setAvatar={setAvatar} />
      </div>
      <div className='tw:mt-4 tw:flex tw:justify-center'>
        <button className='tw:btn tw:justify-center' onClick={() => setAvatar('')}>
          Select
        </button>
      </div>
    </div>
  )
}
