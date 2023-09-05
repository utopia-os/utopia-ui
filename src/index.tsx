export { UtopiaMap, Layer, Tags, Permissions, ItemForm, ItemView, PopupTextAreaInput, PopupStartEndInput, TextView, StartEndView } from './Components/Map';
export {AppShell, Content, SideBar} from "./Components/AppShell"
export {AuthProvider, useAuth, LoginPage, SignupPage} from "./Components/Auth"
export {Settings} from './Components/Profile'
export {Quests, Modal} from './Components/Gaming'
export {TitleCard, CardPage} from './Components/Templates'
export {TextInput, TextAreaInput} from './Components/Input'

import "./index.css"

declare global {
    interface Window {
      my_modal_3: any;
    }
  }