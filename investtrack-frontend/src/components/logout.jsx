import { useAuth } from '../context/authProvider'; // Import authentication context

function logout() {
    const [authUser, setAuthUser] = useAuth(); // Access authentication context

    const handleLogout = () => {
        try {
            // Clear user data from the context and local storage
            setAuthUser({
                ...authUser, user: null,
            });
            localStorage.removeItem("Users"); // Remove user data from local storage

            alert("Logout Successfully!!");
        } catch (err) {
            console.error("Logout error: ", err);
        }
    };

    return handleLogout; // Return handleLogout to be invoked in the component
}

export default logout;
