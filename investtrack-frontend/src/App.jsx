import { useState } from 'react'
import { Routes , Route } from 'react-router-dom'
import { Home } from './pages/home'
import { SignUp } from './pages/SignUp'
import { Learn } from './pages/Learn'
import { AIassistant } from './pages/AIassistant'
import { ContactUs } from './pages/ContactUs'
import { Login } from './pages/login'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/AIassistant" element={<AIassistant />} />
          <Route path="/ContactUs" element={<ContactUs />} />

        </Routes>
      </div>
      <div>
        {/* Additional content can go here */}
      </div>
    </div>
  )
}

export default App
