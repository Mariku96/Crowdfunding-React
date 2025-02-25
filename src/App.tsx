import CampaignsPage from './components/CampaignsPage'
import DashboardPage from './components/DashboardPage'
import HomePage from './components/HomePage'
import NavBar from './components/NavBar'
import { Routes, Route } from 'react-router'

const App = () =>{
  return (
    <>
      <div>
        <NavBar/>
        <Routes>
          <Route path='/dashboard' element={<DashboardPage/>} />
          <Route path='/' element={<HomePage/>}/>
          <Route path='/campaigns' element={<CampaignsPage/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
