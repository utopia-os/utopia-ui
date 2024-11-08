/* eslint-disable @typescript-eslint/no-unsafe-return */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useContext, createContext } from 'react'
import { BrowserRouter as Router, useLocation } from 'react-router-dom'
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

// Helper context to determine if the ContextWrapper is already present.
const ContextCheckContext = createContext(false)

// eslint-disable-next-line react/prop-types
export const ContextWrapper = ({ children }) => {
  const isWrapped = useContext(ContextCheckContext)

  // Check if we are already inside a Router
  let location
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    location = useLocation()
  } catch (e) {
    location = null
  }

  // Case 1: Only the Router is missing, but ContextWrapper is already provided
  if (!location && isWrapped) {
    return <Router>{children}</Router>
  }

  // Case 2: Neither Router nor ContextWrapper is present
  if (!location && !isWrapped) {
    return (
      <Router>
        <ContextCheckContext.Provider value={true}>
          <Wrappers>{children}</Wrappers>
        </ContextCheckContext.Provider>
      </Router>
    )
  }

  // Case 3: Only ContextWrapper is missing
  if (location && !isWrapped) {
    return (
      <ContextCheckContext.Provider value={true}>
        <Wrappers>{children}</Wrappers>
      </ContextCheckContext.Provider>
    )
  }

  // Case 4: Both Router and ContextWrapper are already present
  return children
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
