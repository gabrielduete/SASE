import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/index'
import Display from './pages/DisplayTerminal/index'
import Password from './pages/PasswordTerminal/index'
import Service from './pages/ServiceTerminal/index'
import GlobalStyles from './styles/global'
import PasswordsProvider from './context/Passwords'

function App() {
  return (
    <PasswordsProvider>
      <GlobalStyles />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/password' element={<Password />} />
        <Route path='/service' element={<Service />} />
        <Route path='/display' element={<Display />} />
      </Routes>
    </PasswordsProvider>
  )
}

export default App
