// eslint-disable-next-line import/no-unassigned-import
import './index.css'

export {
  UtopiaMap,
  Layer,
  Tags,
  Permissions,
  ItemForm,
  ItemView,
  PopupTextAreaInput,
  PopupStartEndInput,
  PopupTextInput,
  PopupButton,
  TextView,
  StartEndView,
  PopupCheckboxInput,
} from './Components/Map'
export { AppShell, Content, SideBar, Sitemap } from './Components/AppShell'
export {
  AuthProvider,
  useAuth,
  LoginPage,
  SignupPage,
  RequestPasswordPage,
  SetNewPasswordPage,
} from './Components/Auth'
export { UserSettings, ProfileView, ProfileForm } from './Components/Profile'
export { Quests, Modal } from './Components/Gaming'
export {
  TitleCard,
  CardPage,
  MapOverlayPage,
  OverlayItemsIndexPage,
  MoonCalendar,
  SelectUser,
  AttestationForm,
  MarketView,
} from './Components/Templates'
export { TextInput, TextAreaInput, SelectBox } from './Components/Input'

declare global {
  interface Window {
    my_modal_3: {
      showModal(): void
    }
  }
}
