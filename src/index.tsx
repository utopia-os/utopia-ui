export { UtopiaMap, Layer, Tags, Permissions, ItemForm, ItemView, PopupTextAreaInput, PopupStartEndInput, PopupTextInput, PopupButton, TextView, StartEndView } from './Components/Map';
export {AppShell, Content, SideBar} from "./Components/AppShell"
export {AuthProvider, useAuth, LoginPage, SignupPage, RequestPasswordPage, SetNewPasswordPage} from "./Components/Auth"
export {UserSettings, ProfileSettings, OverlayProfile, OverlayProfileSettings, OverlayUserSettings, OverlayItemProfile, OverlayItemProfileSettings, PlusButton} from './Components/Profile'
export {Quests, Modal} from './Components/Gaming'
export {TitleCard, CardPage, MapOverlayPage, CircleLayout, MoonCalendar, ItemsIndexPage, ItemViewPage} from './Components/Templates'
export {TextInput, TextAreaInput, SelectBox} from './Components/Input'

import "./index.css"

declare global {
    interface Window {
      my_modal_3: any;
    }
  }