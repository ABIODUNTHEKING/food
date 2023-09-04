import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../images/logo.jpeg";
import food from "../images/food.jpg";
import "../styles/login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../config/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  const [passwordSeen, setPasswordSeen] = useState(true);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    let { email, password } = formData;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Email and password confirmed");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      toast.error("Invalid email or password");
    }
  }

  function viewPassword() {
    setPasswordSeen((passwordSeen) => !passwordSeen);
  }

  return (
    <section className="login-page">
      <div className="login-content">
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
              <p className="sub-heading">Log in your account</p>
            </div>
            <form className="form" onSubmit={handleSubmit}>
              <label htmlFor="email">Your Email</label>
              <input
                type="text"
                id="email"
                name="email"
                className="email"
                onChange={handleChange}
              />
              <label htmlFor="password">Password</label>
              <div className="login-passwordContainer">
                <input
                  type={passwordSeen ? "password" : "text"}
                  id="password"
                  name="password"
                  className="login-passwordInput"
                  onChange={handleChange}
                />
                <i
                  className={
                    passwordSeen
                      ? "fa-solid fa-eye eye"
                      : "fa-solid fa-eye-slash eye"
                  }
                  onClick={viewPassword}
                ></i>
              </div>

              <button className="submitButton">Login</button>
            </form>
          </div>
          <p className="no-account">
            Don't have an account?{" "}
            <NavLink className="sign-up" to="sign-up">
              Sign up
            </NavLink>
          </p>
        </div>
      </div>
    </section>
  );
}
