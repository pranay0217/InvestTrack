import { useState } from 'react'
import { Routes , Route, Navigate } from 'react-router-dom'
import { Home } from './pages/home'
import { SignUp } from './pages/SignUp'
import { Learn } from './pages/Learn'
import { AIassistant } from './pages/AIassistant'
import { ContactUs } from './pages/ContactUs'
import { Login } from './pages/login'
import { useAuth } from './context/authProvider';
import { Dashboard } from './pages/Dashboard'

function App() {
  const [count, setCount] = useState(0)
  const { authUser } = useAuth();
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/AIassistant" element={authUser ? <AIassistant /> : <Navigate to="/login" />} /> //allow the user only if the user is logged in or signed in.
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/Dashboard" element={<Dashboard />} /> //allow the user only if the user is logged in or signed in.
        </Routes>
      </div>
    </div>
  )
}

export default App
