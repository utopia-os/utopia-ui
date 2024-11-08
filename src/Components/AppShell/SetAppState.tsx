import { useSetAppState } from './hooks/useAppState'
import { AssetsApi } from '../../types'
import { useEffect } from 'react'

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
