/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createContext, useContext, useState } from 'react'

import type MarkerClusterGroup from 'react-leaflet-cluster'

type UseClusterRefManagerResult = ReturnType<typeof useClusterRefManager>

type ClusterRef = React.MutableRefObject<typeof MarkerClusterGroup>

const ClusterRefContext = createContext<UseClusterRefManagerResult>({
  clusterRef: {} as typeof MarkerClusterGroup,
  setClusterRef: () => {},
})

function useClusterRefManager(): {
  clusterRef: typeof MarkerClusterGroup
  setClusterRef: React.Dispatch<
    React.SetStateAction<React.MutableRefObject<typeof MarkerClusterGroup>>
  >
} {
  const [clusterRef, setClusterRef] = useState<ClusterRef>({} as React.MutableRefObject<undefined>)

  return { clusterRef, setClusterRef }
}

export const ClusterRefProvider: React.FunctionComponent<{
  children?: React.ReactNode
}> = ({ children }) => (
  <ClusterRefContext.Provider value={useClusterRefManager()}>{children}</ClusterRefContext.Provider>
)

export const useClusterRef = (): typeof MarkerClusterGroup => {
  const { clusterRef } = useContext(ClusterRefContext)
  return clusterRef
}

export const useSetClusterRef = (): UseClusterRefManagerResult['setClusterRef'] => {
  const { setClusterRef } = useContext(ClusterRefContext)
  return setClusterRef
}
