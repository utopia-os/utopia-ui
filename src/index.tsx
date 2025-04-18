// eslint-disable-next-line import/no-unassigned-import
import './css'

export * from './Components/Map'
export * from './Components/AppShell'
export * from './Components/Auth'
export * from './Components/Profile'
export * from './Components/Gaming'
export * from './Components/Templates'
export * from './Components/Input'
export * from './Components/Item'

declare global {
  interface Window {
    my_modal_3: {
      showModal(): void
    }
  }
}
