import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import food from "../images/food_2.jpg";
import logo from "../images/logo.jpeg";
import "./login.css";
import { toast } from "react-toastify";
import { auth } from "../config/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUp() {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    userEmail: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const { userEmail, password, confirmPassword } = formData;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (userEmail.trim("") === "") {
      toast.error("Enter in your email address");
    } else if (!emailPattern.test(userEmail)) {
      console.log(emailPattern.test(userEmail));
      toast.error("Enter in a valid email address");
    }

    if (password.trim("") === "") {
      toast.error("Enter in your password");
    } else if (password.length < 5) {
      toast.error("Password is not strong enough");
    }

    if (password.trim("") !== "" && confirmPassword.trim() === "") {
      toast.error("Confirm your password");
    } else if (confirmPassword.toLowerCase() !== password.toLowerCase()) {
      toast.error("Passwords do not match");
    }

    if (
      emailPattern.test(userEmail) &&
      password.length >= 5 &&
      confirmPassword === password
    ) {
      try {
        await createUserWithEmailAndPassword(auth, userEmail, password);
        navigate("/dashboard", { replace: true });
      } catch (err) {
        toast.error("Email address already exist");
      }
    }
  }

  return (
    <section className="sign-up-page">
      <div className="sign-up-content">
        <div className="image">
          {window.innerWidth < 1000 && (
            <img
              src={logo}
              alt="logo"
              className="logo mobile_logo"
              id="image_logo"
            />
          )}
          <img src={food} alt="food" className="main-food" />
        </div>
        <div className="userData">
          <div>
            <div className="intro">
              {console.log(window.innerWidth)}
              {window.innerWidth > 1000 && (
                <img src={logo} alt="logo" className="logo" />
              )}
              <h1 className="heading">Welcome</h1>
              <p className="sub-heading">Create an account</p>
            </div>
            <form className="form" onSubmit={handleSubmit}>
              <label htmlFor="text">Enter in your Email Address</label>
              <input
                type="text"
                id="phone"
                name="userEmail"
                className="userEmail"
                onChange={handleChange}
              />
              <label htmlFor="sign-up-password">Password</label>
              <input
                type="password"
                id="sign-up-password"
                name="password"
                onChange={handleChange}
              />
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                onChange={handleChange}
              />
              <button className="submitButton">Sign up</button>
            </form>
            <p className="account">
              Have an account?{" "}
              <NavLink className="sign-in" to="/">
                Sign in
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
