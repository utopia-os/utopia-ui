import { useEffect } from 'react'

import { useSetAppState } from './hooks/useAppState'

import type { AssetsApi } from '#types/AssetsApi'

export const SetAppState = ({ assetsApi }: { assetsApi: AssetsApi }) => {
  const setAppState = useSetAppState()

  useEffect(() => {
    setAppState({ assetsApi })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetsApi])

  return <></>
}
