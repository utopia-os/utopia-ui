import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import { QuestsProvider } from '../Gaming/hooks/useQuests'
import { ClusterRefProvider } from '../Map/hooks/useClusterRef'
import { FilterProvider } from '../Map/hooks/useFilter'
import { ItemsProvider } from '../Map/hooks/useItems'
import { LayersProvider } from '../Map/hooks/useLayers'
import { LeafletRefsProvider } from '../Map/hooks/useLeafletRefs'
import { PermissionsProvider } from '../Map/hooks/usePermissions'
import { SelectPositionProvider } from '../Map/hooks/useSelectPosition'
import { TagsProvider } from '../Map/hooks/useTags'
import { AssetsProvider } from './hooks/useAssets'
import { useContext, createContext } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';


// Helper context to determine if the ContextWrapper is already present.
const ContextCheckContext = createContext(false);

export const ContextWrapper = ({ children }) => {
  const isWrapped = useContext(ContextCheckContext);

  // Check if we are already inside a Router
  let location;
  try {
    location = useLocation();
  } catch (e) {
    location = null;
  }

  // Case 1: Only the Router is missing, but ContextWrapper is already provided
  if (!location && isWrapped) {
    return (
      <Router>
        {children}
      </Router>
    );
  }

  // Case 2: Neither Router nor ContextWrapper is present
  if (!location && !isWrapped) {
    return (
      <Router>
        <ContextCheckContext.Provider value={true}>
          <Wrappers>
            {children}
          </Wrappers>
        </ContextCheckContext.Provider>
      </Router>
    );
  }

  // Case 3: Only ContextWrapper is missing
  if (location && !isWrapped) {
    return (
      <ContextCheckContext.Provider value={true}>
        <Wrappers>{children}</Wrappers>
      </ContextCheckContext.Provider>
    );
  }

  // Case 4: Both Router and ContextWrapper are already present
  return children;
};

export const Wrappers = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <PermissionsProvider initialPermissions={[]}>
      <TagsProvider initialTags={[]}>
        <LayersProvider initialLayers={[]}>
          <FilterProvider initialTags={[]}>
            <ItemsProvider initialItems={[]}>
              <SelectPositionProvider>
                <LeafletRefsProvider initialLeafletRefs={{}}>
                  <QueryClientProvider client={queryClient}>
                    <AssetsProvider>
                      <ClusterRefProvider>
                        <QuestsProvider initialOpen={true}>
                          <ToastContainer position="top-right"
                            autoClose={2000}
                            hideProgressBar
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light" />
                          {children}
                        </QuestsProvider>
                      </ClusterRefProvider>
                    </AssetsProvider>
                  </QueryClientProvider>
                </LeafletRefsProvider>
              </SelectPositionProvider>
            </ItemsProvider>
          </FilterProvider>
        </LayersProvider>
      </TagsProvider>
    </PermissionsProvider>
  );
};