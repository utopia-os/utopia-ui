import { useEffect } from 'react'

import { useSetAppState } from './hooks/useAppState'

import type { AssetsApi } from '#types/AssetsApi'

export const SetAppState = ({
  assetsApi,
  embedded,
}: {
  assetsApi: AssetsApi
  embedded?: boolean
}) => {
  const setAppState = useSetAppState()

  useEffect(() => {
    setAppState({ assetsApi })
  }, [assetsApi, setAppState])

  useEffect(() => {
    setAppState({ embedded })
  }, [embedded, setAppState])

  return <></>
}
