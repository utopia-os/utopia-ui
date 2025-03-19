import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useContext, createContext } from 'react'
import { BrowserRouter as Router, useInRouterContext } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { QuestsProvider } from '#components/Gaming/hooks/useQuests'
import { ClusterRefProvider } from '#components/Map/hooks/useClusterRef'
import { FilterProvider } from '#components/Map/hooks/useFilter'
import { ItemsProvider } from '#components/Map/hooks/useItems'
import { LayersProvider } from '#components/Map/hooks/useLayers'
import { LeafletRefsProvider } from '#components/Map/hooks/useLeafletRefs'
import { PermissionsProvider } from '#components/Map/hooks/usePermissions'
import { SelectPositionProvider } from '#components/Map/hooks/useSelectPosition'
import { TagsProvider } from '#components/Map/hooks/useTags'

import { AppStateProvider } from './hooks/useAppState'

import type { CloseButtonProps } from 'react-toastify'

// Helper context to determine if the ContextWrapper is already present.
const ContextCheckContext = createContext(false)

const CloseButton = ({ closeToast }: CloseButtonProps) => (
  <button
    className='tw-btn tw-btn-sm tw-btn-circle tw-btn-ghost tw-absolute tw-right-2 tw-top-2 focus:tw-outline-none'
    onClick={closeToast}
  >
    ✕
  </button>
)

export const ContextWrapper = ({ children }: { children: React.ReactNode }) => {
  const isWrapped = useContext(ContextCheckContext)

  const isInsideRouter = useInRouterContext()

  let returnValue = children

  if (!isWrapped) {
    returnValue = (
      <ContextCheckContext.Provider value={true}>
        <Wrappers>{returnValue}</Wrappers>
      </ContextCheckContext.Provider>
    )
  }

  if (!isInsideRouter) {
    returnValue = <Router>{returnValue}</Router>
  }

  return returnValue
}

// eslint-disable-next-line react/prop-types
export const Wrappers = ({ children }) => {
  const queryClient = new QueryClient()

  return (
    <PermissionsProvider initialPermissions={[]}>
      <TagsProvider initialTags={[]}>
        <LayersProvider initialLayers={[]}>
          <FilterProvider initialTags={[]}>
            <ItemsProvider initialItems={[]}>
              <SelectPositionProvider>
                <LeafletRefsProvider initialLeafletRefs={{}}>
                  <QueryClientProvider client={queryClient}>
                    <AppStateProvider>
                      <ClusterRefProvider>
                        <QuestsProvider initialOpen={true}>
                          <ToastContainer
                            position='top-right'
                            autoClose={2000}
                            hideProgressBar
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme='light'
                            closeButton={CloseButton}
                          />
                          {children}
                        </QuestsProvider>
                      </ClusterRefProvider>
                    </AppStateProvider>
                  </QueryClientProvider>
                </LeafletRefsProvider>
              </SelectPositionProvider>
            </ItemsProvider>
          </FilterProvider>
        </LayersProvider>
      </TagsProvider>
    </PermissionsProvider>
  )
}
