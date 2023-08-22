import { AppShell, SideBar, Content, AuthProvider, useAuth, Settings, Modal, Quests, LoginPage, SignupPage } from 'utopia-ui'
import { routes } from './routes/sidebar'
import { Route, Routes } from 'react-router-dom'
import MapContainer from "./pages/MapContainer"
import './App.css'
import Concept from './pages/Concept'
import { userApi } from './api/userApi'


function App() {



  return (

    <div className="App overflow-x-hidden">

      <AuthProvider userApi={new userApi}>
        <AppShell appName="Utopia Game" useAuth={useAuth}>
        <Modal/>
          <SideBar routes={routes} />
          <Content>
            <Quests />
            <Routes>
              <Route path="/" element={<MapContainer />} />
              <Route path="/settings" element={<Settings useAuth={useAuth} />} />
              <Route path="/concept" element={<Concept/>} />
              <Route path="/login" element={<LoginPage/>} />
              <Route path="/signup" element={<SignupPage/>} />
            </Routes>
          </Content>
        </AppShell>
      </AuthProvider>
    </div>
  )
}

export default App
