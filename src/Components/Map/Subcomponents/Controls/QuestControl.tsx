import HandRaisedIcon from '@heroicons/react/24/outline/HandRaisedIcon'

import { useQuestsOpen, useSetQuestOpen } from '#components/Gaming/hooks/useQuests'

export function QuestControl() {
  const questsOpen = useQuestsOpen()
  const setQuestsOpen = useSetQuestOpen()

  return (
    <>
      {questsOpen ? (
        ''
      ) : (
        <div
          className='tw-card tw-bg-base-100 tw-shadow-xl tw-my-2 tw-w-10'
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className='tw-card-body hover:tw-bg-slate-300 tw-rounded-2xl tw-p-2 tw-h-10 tw-w-10 tw-transition-all tw-duration-300 hover:tw-cursor-pointer'
            onClick={() => setQuestsOpen(true)}
          >
            <HandRaisedIcon />
          </div>
        </div>
      )}
    </>
  )
}
