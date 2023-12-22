import * as React from 'react'
import NavBar from './NavBar'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { QuestsProvider } from '../Gaming/hooks/useQuests'
import { AssetsProvider, useSetAssetApi } from './hooks/useAssets'
import { useEffect } from 'react'
import { SetAssetsApi } from './SetAssetsApi'

export function AppShell({ appName, children, assetsApi }) {


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
                    <NavBar appName={appName}></NavBar>
                    <div id="app-content" className="tw-flex tw-!pl-[77px]">
                        {children}
                    </div>
                </QuestsProvider>
            </AssetsProvider>
        </BrowserRouter>
    )
}
