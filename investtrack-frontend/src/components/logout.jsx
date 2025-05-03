import React from 'react'
import { useAuth } from '../context/authProvider' // Importing the authentication context to access the authUser state
import toast from 'react-hot-toast';

function logout() {
    const [authUser, setAuthUser] = useAuth(); // Accessing the authentication context to get the authUser state
    const handleLogout = () => {
        try{
            setAuthUser({
                ...authUser, user: null
            });
            localStorage.removeItem("Users"); //  this is used to remove the data from the local storage of the browser so that it can be used later on.
            toast.success("Logout Successfully!!")
            window.location.href = "/"; // Redirecting to the home page after logout
        } catch(err) {
            toast.error("Error: " + err.response.data.message)
        }
    };
  return (
    <div>
      <button className="logout-button"
      onclick={handleLogout}>Logout</button>
    </div>
  )
}

export default logout
