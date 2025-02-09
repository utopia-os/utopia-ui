import { ContextWrapper } from './ContextWrapper'
import NavBar from './NavBar'
import { SetAppState } from './SetAppState'

import type { AssetsApi } from '#src/types/AssetsApi'

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
        <SetAppState assetsApi={assetsApi} userType={userType} />
        <NavBar userType={userType} appName={appName}></NavBar>
        <div id='app-content' className='tw-flex-grow'>
          {children}
        </div>
      </div>
    </ContextWrapper>
  )
}
