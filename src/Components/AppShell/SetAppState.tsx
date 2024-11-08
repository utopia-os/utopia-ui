import { useEffect } from 'react'

import { AssetsApi } from '#src/types'

import { useSetAppState } from './hooks/useAppState'

export const SetAppState = ({
  assetsApi,
  userType,
}: {
  assetsApi: AssetsApi
  userType: string
}) => {
  const setAppState = useSetAppState()

  useEffect(() => {
    setAppState({ assetsApi })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetsApi])

  useEffect(() => {
    setAppState({ userType })
  }, [setAppState, userType])

  return <></>
}
