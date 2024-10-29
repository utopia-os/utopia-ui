import { useCallback, useState, createContext, useContext } from 'react'
import * as React from 'react'

type UseQuestManagerResult = ReturnType<typeof useQuestsManager>;

const QuestContext = createContext<UseQuestManagerResult>({
  open: false,
  setQuestsOpen: () => { }
})

function useQuestsManager (initialOpen: boolean): {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setQuestsOpen: (open: boolean) => void;
} {
  const [open, setOpen] = useState<boolean>(initialOpen)

  const setQuestsOpen = useCallback((questOpen: boolean) => {
    setOpen(questOpen)
  }, [])

  return { open, setQuestsOpen }
}

export const QuestsProvider: React.FunctionComponent<{
  initialOpen: boolean, children?: React.ReactNode
}> = ({ initialOpen, children }) => (
  <QuestContext.Provider value={useQuestsManager(initialOpen)}>
    {children}
  </QuestContext.Provider>
)

export const useQuestsOpen = (): boolean => {
  const { open } = useContext(QuestContext)
  return open
}

export const useSetQuestOpen = (): UseQuestManagerResult['setQuestsOpen'] => {
  const { setQuestsOpen } = useContext(QuestContext)
  return setQuestsOpen
}
