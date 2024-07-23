import * as React from 'react'
import NavBar from './NavBar'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { QuestsProvider } from '../Gaming/hooks/useQuests'
import { AssetsProvider } from './hooks/useAssets'
import { SetAssetsApi } from './SetAssetsApi'
import { AssetsApi } from '../../types'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PermissionsProvider } from '../Map/hooks/usePermissions'
import { TagsProvider } from '../Map/hooks/useTags'
import { FilterProvider } from '../Map/hooks/useFilter'
import { ItemsProvider } from '../Map/hooks/useItems'
import { LayersProvider } from '../Map/hooks/useLayers'
import { LeafletRefsProvider } from '../Map/hooks/useLeafletRefs'
import { SelectPositionProvider } from '../Map/hooks/useSelectPosition'
import { ClusterRefProvider } from '../Map/hooks/useClusterRef'
import 'react-toastify/dist/ReactToastify.css';


export function AppShell({ appName, children, assetsApi, userType }: { appName: string, children: React.ReactNode, assetsApi: AssetsApi, userType: string }) {

    // Create a client
    const queryClient = new QueryClient()


    return (
        <BrowserRouter>
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
                                                    <SetAssetsApi assetsApi={assetsApi}></SetAssetsApi>
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
                                                        <div className='tw-flex tw-flex-col tw-h-full'>
                                                            <NavBar userType={userType} appName={appName}></NavBar>
                                                            <div id="app-content" className="tw-flex-grow">
                                                                {children}
                                                            </div>
                                                        </div>
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
        </BrowserRouter>

    )
}
