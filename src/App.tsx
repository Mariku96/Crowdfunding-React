import CampaignsPage from './pages/CampaignsPage'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import NavBar from './components/NavBar'
import { Routes, Route } from 'react-router'
import CampaignDetailPage from './pages/CampaignDetailPage'

const App = () =>{
  return (
    <>
      <div>
        <NavBar/>
        <Routes>
          <Route path='/dashboard' element={<DashboardPage/>} />
          <Route path='/' element={<HomePage/>}/>
          <Route path='/campaigns' element={<CampaignsPage/>} />
          <Route path='campaigns/detail/:address' element={<CampaignDetailPage/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
