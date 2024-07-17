import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import baseStyle from "./Base.module.css";
import loginStyle from "./Login.module.css";
import { baseApi } from "../../constants";

const Login = ({ setAccount }) => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [user, setUserDetails] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate input field based on its name
    let error = "";
    if (name === "email") {
      const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!value.trim()) {
        error = "Email is required";
      } else if (!regex.test(value)) {
        error = "Please enter a valid email address";
      }
    } else if (name === "password") {
      if (!value) {
        error = "Password is required";
      }
    }

    // Update the state with new value and error message
    setUserDetails({
      ...user,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: error,
    });
  };

  const validateForm = (values) => {
    const errors = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email.trim()) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const handleforgot = () => {
    try {
      var currentURL = new URL(window.location.href);
      var baseURL = currentURL.origin + currentURL.pathname;

      var forgotPassURL = baseURL.slice(0, -5) + "forgotpass";

      window.location.href = forgotPassURL;
      alert("Do you forget password?");
    } catch (error) {
      console.error("Error handling forgot password:", error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const errors = validateForm(user);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      axios
        .post(`${baseApi}/account/login`, {
          email: user.email,
          password: user.password,
        })
        .then((res) => {
          if (res.status === 202) {
            alert(
              "Your Email is not verified yet. Verification email has been sent. Please login again after verification."
            );
          } else if (res.status === 203) {
            alert("Your Phone is not verified yet. Please Contact +2341238123");
          } else if (res.status === 200) {
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("currentUser", res.data.data.roles);
            sessionStorage.setItem(
              "rebate",
              JSON.stringify(res.data.data.rebate)
            );
            localStorage.setItem("userEmail", user.email);
            navigate("/", { replace: true });
            setAccount(false);
          }
        })
        .catch((error) => {
          if (error.response.status === 404) {
            alert("This email is not registered yet. Please sing up first.");
            setUserDetails({ email: "", password: "" });
          } else if (error.response.status === 400) {
            alert("Password is incorrect.");
            setUserDetails({
              ...user,
              password: "",
            });
          } else if (error.response.status === 500) {
            alert("Server error.");
            navigate("/", { replace: true });
            setAccount(false);
          }
        });
    }
  };

  return (
    <div className={baseStyle.account}>
      <div className={loginStyle.login}>
        <h1>Registrovani korisnik</h1>
        <h2>Prijavi se</h2>
        <form>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={user.email}
          />
          {formErrors.email && (
            <p className={baseStyle.error}>{formErrors.email}</p>
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={user.password}
          />
          {formErrors.password && (
            <p className={baseStyle.error}>{formErrors.password}</p>
          )}
          <button
            style={{
              border: "none",
              backgroundColor: "transparent",
              display: "flex",
              justifyContent: "left",
              paddingLeft: 0,
            }}
            className={loginStyle.change_color}
            onClick={handleforgot}
          >
            Zaboravili ste lozinku?
          </button>
          <button className={loginStyle.hoverbutton} onClick={handleLogin}>
            Prijavite se
          </button>
          <input type="checkbox" />
          <label>Zapamti me</label>
        </form>
        <Link to="/account/signup">Not yet registered? Register Now</Link>
      </div>
    </div>
  );
};

export default Login;
