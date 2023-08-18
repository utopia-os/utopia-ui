export { UtopiaMap, Layer, Tags, Item, Tag } from './Components/Map/index';
export {AppShell, Content, SideBar} from "./Components/AppShell"
export {AuthProvider, useAuth, LoginPage, SignupPage} from "./Components/Auth"
export {Settings} from './Components/Profile'
export {Quests, Modal} from './Components/Gaming'
export {TitleCard, CardPage} from './Components/Templates'

import "./index.css"

declare global {
    interface Window {
      my_modal_3: any;
      sign_up_modal: any;
    }
  }