// @ts-ignore
import { AppShell, SideBar, Content, AuthProviderDirectus, useAuthDirectus, Settings, Modal, Quests } from 'utopia-ui'
import { routes } from './routes/sidebar'
import {  Route, Routes } from 'react-router-dom'
import MapContainer from "./pages/MapContainer"
import './App.css'
import { directus } from './api/directus'


function App() {

  return (

    <div className="App overflow-x-hidden">

      <AuthProviderDirectus directus={directus}>
        <Modal/>
       {/** <Quests/> */} 
        <AppShell name="Healing the Planet" useAuth={useAuthDirectus}>
          <SideBar routes={routes} />
          <Content>
            <Routes>
              <Route path="/" element={<MapContainer />} />
              <Route path="/settings" element={<Settings useAuth={useAuthDirectus}/>} />
            </Routes>
          </Content>
        </AppShell>
      </AuthProviderDirectus>
    </div>
  )
}

export default App
