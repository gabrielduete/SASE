import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/index'
import Display from './pages/DisplayTerminal/index'
import Password from './pages/PasswordTerminal/index'
import Service from './pages/ServiceTerminal/index'

function App() {
  return (
    <Routes>
      <Route path='/home' element={<Home />} />
      <Route path='/password' element={<Password />} />
      <Route path='/service' element={<Service />} />
      <Route path='/display' element={<Display />} />
    </Routes>
  )
}

export default App
