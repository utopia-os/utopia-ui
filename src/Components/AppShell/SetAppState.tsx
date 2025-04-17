import { useEffect } from 'react'

import { useSetAppState } from './hooks/useAppState'

import type { AssetsApi } from '#types/AssetsApi'

export const SetAppState = ({
  assetsApi,
  embedded,
  openCollectiveApiKey,
}: {
  assetsApi: AssetsApi
  embedded?: boolean
  openCollectiveApiKey?: string
}) => {
  const setAppState = useSetAppState()

  useEffect(() => {
    setAppState({ assetsApi })
  }, [assetsApi, setAppState])

  useEffect(() => {
    setAppState({ embedded })
  }, [embedded, setAppState])

  useEffect(() => {
    setAppState({ openCollectiveApiKey })
  }, [openCollectiveApiKey, setAppState])

  return <></>
}
