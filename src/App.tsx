import { AppShell, SideBar, Content, AuthProvider, UserSettings, ProfileSettings, Modal, LoginPage, SignupPage, Quests } from 'utopia-ui'
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
import { ProfileView } from './pages/ProfileView'



function App() {

  return (

    <div className="App overflow-x-hidden">

      <AuthProvider userApi={new userApi}>
        <AppShell assetsApi={new assetsApi("https://api.utopia-lab.org/assets/")} appName="Utopia Game">
        <Modal>
          <ModalContent/>
        </Modal>
          <SideBar routes={routes} bottomRoutes={bottomRoutes}/>
          <Content>
            <Quests /> 
            <Routes>
              <Route path="/*" element={<MapContainer />} />
              <Route path="/settings" element={<UserSettings />} />
              <Route path="/profile" element={<ProfileSettings />} />
              <Route path="/concept" element={<Concept/>} />
              <Route path="/projects" element={<Projects/>} />
              <Route path="/projects/*" element={<ProjectView/>} />
              <Route path="/login" element={<LoginPage/>} />
              <Route path="/signup" element={<SignupPage/>} />
              <Route path="/profile/*" element={<ProfileView/>} />
            </Routes>
          </Content>
        </AppShell>
      </AuthProvider>
    </div>
  )
}

export default App
