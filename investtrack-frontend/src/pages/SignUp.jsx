import React from "react";
import { useForm } from "react-hook-form" //used for matching the input with the authentication standards adn handling errors, like not entering any input etc.

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => console.log(data)
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>INVEST-TRACK</h2>
        <form style={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="Name" style={styles.input}{...register("name", { required: true })} /> {errors.name && <span>This field is required</span>}
          <input type="email" placeholder="Email" style={styles.input} {...register("email", { required: true })}/> {errors.email && <span>This field is required</span>}
          <input type="password" placeholder="Password" style={styles.input} {...register("password", { required: true })}/> {errors.password && <span>This field is required</span>}
          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>

        <p style={styles.loginText}>
          Already have an account?{" "}
          <a href="/login" style={styles.link}>
            Log in
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
              Sign up with Google
            </button>
          </div>
      </div>
    </div>
  );
}

// Inline styles
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
    fontWeight: "bold",
    fontSize: "2rem",
    fontFamily: 'Roboto, sans-serif'
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
    backgroundColor: "#4CAF50",
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
  googleButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "0.75rem",
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
  googleButtonWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  
};
