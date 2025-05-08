import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/home';
import { SignUp } from './pages/SignUp';
import { Learn } from './pages/Learn';
import { AIassistant } from './pages/AIassistant';
import { ContactUs } from './pages/ContactUs';
import { Login } from './pages/login';
import { useAuth } from './context/authProvider';
import { Dashboard } from './pages/Dashboard';
import { Addnewbroker } from './pages/Addnewbroker';
import { Profile } from './pages/profile';
import { HowInvestTrackWorks } from './pages/howinvesttrackworks';

function App() {
  const { authUser } = useAuth(); // Access the authUser state

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/addnewbroker" element={<Addnewbroker />} />
        <Route path="/AIassistant" element={<Login />} />
        <Route path="/AI-assistant" element={<AIassistant/>} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Contact" element={<ContactUs />} />

        <Route path="/howinvesttrackworks" element={<HowInvestTrackWorks />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
