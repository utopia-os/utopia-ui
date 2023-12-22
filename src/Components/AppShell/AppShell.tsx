import * as React from 'react'
import NavBar from './NavBar'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { QuestsProvider } from '../Gaming/hooks/useQuests'
import { AssetsProvider, useSetAssetApi } from './hooks/useAssets'
import { SetAssetsApi } from './SetAssetsApi'
import { AssetsApi } from '../../types'

export function AppShell({ appName, nameWidth, children, assetsApi } : {appName: string, nameWidth?: number, children: React.ReactNode, assetsApi: AssetsApi}) {


    return (
        <BrowserRouter>
            <AssetsProvider>
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
                    <NavBar appName={appName} nameWidth={nameWidth}></NavBar>
                    <div id="app-content" className="tw-flex tw-!pl-[77px]">
                        {children}
                    </div>
                </QuestsProvider>
            </AssetsProvider>
        </BrowserRouter>
    )
}
