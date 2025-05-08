import React from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure you're using this hook for redirection

function logout() {
  const navigate = useNavigate(); // Use navigate to redirect user to the login page
  try {
    // Clear all localStorage items
    localStorage.clear();
    localStorage.removeItem('angel_token');
    localStorage.removeItem('angel_clientcode');


    // Optionally, reset your application state (context, state variables, etc.)
    alert("Logged out successfully!");

    // Redirect the user to the login page after logout
    navigate("/");
  } catch (err) {
    console.error("Logout error: ", err);
  }
}

export default logout;
