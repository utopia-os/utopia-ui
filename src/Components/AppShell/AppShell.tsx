import * as React from 'react'
import NavBar from './NavBar'
import { SetAssetsApi } from './SetAssetsApi'
import { AssetsApi } from '../../types'
import { ContextWrapper } from './ContextWrapper'

export function AppShell({
  appName,
  children,
  assetsApi,
  userType,
}: {
  appName: string
  children: React.ReactNode
  assetsApi: AssetsApi
  userType: string
}) {
  return (
    <ContextWrapper>
      <div className='tw-flex tw-flex-col tw-h-full'>
        <SetAssetsApi assetsApi={assetsApi} />
        <NavBar userType={userType} appName={appName}></NavBar>
        <div id='app-content' className='tw-flex-grow'>
          {children}
        </div>
      </div>
    </ContextWrapper>
  )
}
