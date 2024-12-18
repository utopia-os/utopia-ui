/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import { useCallback, useState, createContext, useContext } from 'react'

type UseQuestManagerResult = ReturnType<typeof useQuestsManager>

const QuestContext = createContext<UseQuestManagerResult>({
  open: false,
  setQuestsOpen: () => {},
})

function useQuestsManager(initialOpen: boolean): {
  open: boolean
  setQuestsOpen: (open: boolean) => void
} {
  const [open, setOpen] = useState<boolean>(initialOpen)

  const setQuestsOpen = useCallback((questOpen: boolean) => {
    setOpen(questOpen)
  }, [])

  return { open, setQuestsOpen }
}

export const QuestsProvider: React.FunctionComponent<{
  initialOpen: boolean
  children?: React.ReactNode
}> = ({ initialOpen, children }) => (
  <QuestContext.Provider value={useQuestsManager(initialOpen)}>{children}</QuestContext.Provider>
)

export const useQuestsOpen = (): boolean => {
  const { open } = useContext(QuestContext)
  return open
}

export const useSetQuestOpen = (): UseQuestManagerResult['setQuestsOpen'] => {
  const { setQuestsOpen } = useContext(QuestContext)
  return setQuestsOpen
}
