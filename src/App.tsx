import { AppShell, SideBar, Content, AuthProvider, Modal, LoginPage, SignupPage, Quests, RequestPasswordPage, SetNewPasswordPage, OverlayProfile, OverlayProfileSettings, OverlayUserSettings } from 'utopia-ui'
import { bottomRoutes, routes } from './routes/sidebar'
import { Route, Routes } from 'react-router-dom'
import MapContainer from "./pages/MapContainer"
import './App.css'
import Concept from './pages/Concept'
import { userApi } from './api/userApi'
import Projects from './pages/Projects'
import { ProjectView } from './pages/ProjectView'
import { assetsApi } from './api/assetsApi'
import { ModalContent } from './ModalContent'

function App() {

  return (

    <div className="App overflow-x-hidden">

      <AuthProvider userApi={new userApi}>
        <AppShell assetsApi={new assetsApi("https://api.utopia-lab.org/assets/")} appName="Development" nameWidth={220}>
        <Modal>
          <ModalContent/>
        </Modal>
          <SideBar routes={routes} bottomRoutes={bottomRoutes}/>
          <Content>
            <Quests /> 
            <Routes>
              <Route path="/*" element={<MapContainer />}>
                <Route path='login' element={<LoginPage />}/>
                <Route path='signup' element={<SignupPage />}/>
                <Route path='reset-password' element={<RequestPasswordPage reset_url="https://dev.utopia-lab.org/set-new-password/"/>}/>
                <Route path='set-new-password' element={<SetNewPasswordPage />}/>
                <Route path="profile/*" element={<OverlayProfile/>} />
                <Route path="profile-settings" element={<OverlayProfileSettings/>} />
                <Route path="user-settings" element={<OverlayUserSettings />} />
              </Route>
              <Route path="/concept" element={<Concept/>} />
              <Route path="/projects" element={<Projects/>} />
              <Route path="/projects/*" element={<ProjectView/>} />
            </Routes>
          </Content>
        </AppShell>
      </AuthProvider>
    </div>
  )
}

export default App
