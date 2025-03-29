import { createContext, useContext, useState } from 'react'

import type { PopupFormState } from '#types/PopupFormState'

type UsePopupFormManagerResult = ReturnType<typeof usePopupFormManager>

const PoupFormContext = createContext<UsePopupFormManagerResult>({
  popupForm: {} as PopupFormState | null,
  setPopupForm: () => {},
})

function usePopupFormManager(): {
  popupForm: PopupFormState | null
  setPopupForm: React.Dispatch<React.SetStateAction<PopupFormState | null>>
} {
  const [popupForm, setPopupForm] = useState<PopupFormState | null>(null)

  return { popupForm, setPopupForm }
}

interface Props {
  children?: React.ReactNode
}

export const ClusterRefProvider: React.FunctionComponent<Props> = ({ children }: Props) => (
  <PoupFormContext.Provider value={usePopupFormManager()}>{children}</PoupFormContext.Provider>
)

export const usePopupForm = (): UsePopupFormManagerResult => {
  const { popupForm, setPopupForm } = useContext(PoupFormContext)
  return { popupForm, setPopupForm }
}
