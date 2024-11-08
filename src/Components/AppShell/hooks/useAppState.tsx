/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import { useCallback, useState, createContext, useContext } from 'react'

import { AssetsApi } from '#src/types'

interface AppState {
  assetsApi: AssetsApi
  userType: string
}

type UseAppManagerResult = ReturnType<typeof useAppManager>

const initialAppState: AppState = {
  assetsApi: {} as AssetsApi,
  userType: '',
}

const AppContext = createContext<UseAppManagerResult>({
  state: initialAppState,
  setAppState: () => {},
})

function useAppManager(): {
  state: AppState
  setAppState: (newState: Partial<AppState>) => void
} {
  const [state, setState] = useState<AppState>(initialAppState)

  const setAppState = useCallback((newState: Partial<AppState>) => {
    setState((prevState) => ({
      ...prevState,
      ...newState,
    }))
  }, [])

  return { state, setAppState }
}

export const AppStateProvider: React.FunctionComponent<{
  children?: React.ReactNode
}> = ({ children }) => <AppContext.Provider value={useAppManager()}>{children}</AppContext.Provider>

export const useAppState = (): AppState => {
  const { state } = useContext(AppContext)
  return state
}

export const useSetAppState = (): UseAppManagerResult['setAppState'] => {
  const { setAppState } = useContext(AppContext)
  return setAppState
}
