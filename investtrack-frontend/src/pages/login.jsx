import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import axios from "axios"
import { Toaster,toast } from "react-hot-toast";

export function Login() {

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
    
      const onSubmit =async (data) => {
        const userInfo={
          email: data.email,
          password: data.password
        }
        await axios.post("http://localhost:3000/user/login", userInfo) // Updated endpoint to login
        .then((res)=>{
          console.log(res.data)
          if(res.data){
            navigate("/Dashboard") // Redirect to the dashboard page after successful login
            alert("Login Successful")
          }
          localStorage.setItem("Users",JSON.stringify(res.data.user))
        }).catch((err)=>{ 
          if(err.response){
            console.log(err)
            toast.error("Error: "+ err.response.data.message)
          } else {
            alert("An unexpected error occurred.")
          }
        })
      }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Log In</h2>
        <form style={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input type="email" placeholder="Email" style={styles.input} {...register("email", { required: true })} /> {errors.email && <span className="text-sm text-red-500">This field is required</span>}

          <input type="password" placeholder="Password" style={styles.input} {...register("password", { required: true })} /> {errors.password && <span className="text-sm text-red-500">This field is required</span>}

          <button type="submit" style={styles.button}>
            Log In
          </button>
        </form>

        <p style={styles.loginText}>
          Don't have an account?{" "}
          <a href="/signup" style={styles.link}>
            Sign up
          </a>
        </p>

        <div style={styles.divider}>OR</div>

        <div style={styles.googleButtonWrapper}>
          <button style={styles.googleButton}>
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google Logo"
              style={styles.googleIcon}
            />
            Log in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f2f2f2",
  },
  card: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.75rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  loginText: {
    marginTop: "1rem",
    textAlign: "center",
  },
  link: {
    color: "#007BFF",
    textDecoration: "none",
  },
  divider: {
    textAlign: "center",
    margin: "1rem 0",
    fontWeight: "bold",
    color: "#888",
  },
  googleButtonWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  googleButton: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "0.75rem 1rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#fff",
    cursor: "pointer",
    fontSize: "1rem",
  },
  googleIcon: {
    width: "20px",
    height: "20px",
  },
};
