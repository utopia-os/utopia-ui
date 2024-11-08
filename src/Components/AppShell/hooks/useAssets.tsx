/* eslint-disable react/prop-types */

/* eslint-disable @typescript-eslint/no-empty-function */
import { useCallback, useState, createContext, useContext } from 'react'

import { AssetsApi } from '#src/types'

type UseAssetManagerResult = ReturnType<typeof useAssetsManager>

const AssetContext = createContext<UseAssetManagerResult>({
  api: {} as AssetsApi,
  setAssetsApi: () => {},
})

function useAssetsManager(): {
  api: AssetsApi
  setAssetsApi: (api: AssetsApi) => void
} {
  const [api, setApi] = useState<AssetsApi>({} as AssetsApi)

  const setAssetsApi = useCallback((api: AssetsApi) => {
    setApi(api)
  }, [])

  return { api, setAssetsApi }
}

export const AssetsProvider: React.FunctionComponent<{
  children?: React.ReactNode
}> = ({ children }) => (
  <AssetContext.Provider value={useAssetsManager()}>{children}</AssetContext.Provider>
)

export const useAssetApi = (): AssetsApi => {
  const { api } = useContext(AssetContext)
  return api
}

export const useSetAssetApi = (): UseAssetManagerResult['setAssetsApi'] => {
  const { setAssetsApi } = useContext(AssetContext)
  return setAssetsApi
}
