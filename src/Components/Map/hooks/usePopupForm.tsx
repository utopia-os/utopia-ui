import { createContext, useContext, useState } from 'react'

import type { ItemFormPopupProps } from '#types/ItemFormPopupProps'

type UsePopupFormManagerResult = ReturnType<typeof usePopupFormManager>

const PoupFormContext = createContext<UsePopupFormManagerResult>({
  popupForm: {} as ItemFormPopupProps | null,
  setPopupForm: () => {},
})

function usePopupFormManager(): {
  popupForm: ItemFormPopupProps | null
  setPopupForm: React.Dispatch<React.SetStateAction<ItemFormPopupProps | null>>
} {
  const [popupForm, setPopupForm] = useState<ItemFormPopupProps | null>(null)

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
