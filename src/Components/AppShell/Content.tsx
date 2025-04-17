import { useAppState } from './hooks/useAppState'

interface ContentProps {
  children?: React.ReactNode
}

/**
 * @category AppShell
 */
export function Content({ children }: ContentProps) {
  const appState = useAppState()

  return (
    <div
      className={`${appState.sideBarOpen && !appState.sideBarSlim ? 'tw:ml-48' : appState.sideBarOpen && appState.sideBarSlim ? 'tw:ml-14' : ''} tw:w-full tw:h-full tw:bg-base-200 tw:relative tw:transition-all tw:duration-300`}
    >
      {children}
    </div>
  )
}
