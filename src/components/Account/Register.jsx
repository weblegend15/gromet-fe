import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import baseStyle from "./Base.module.css";
import registerStyle from "./Register.module.css";
import { baseApi } from "../../constants";

const Register = ({ setAccount }) => {
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});
  const [user, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const validateForm = (values) => {
    const errors = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username.trim()) {
      errors.username = "Username is required";
    }
    if (!values.email.trim()) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    if (!values.cpassword) {
      errors.cpassword = "Confirm Password is required";
    } else if (values.cpassword !== values.password) {
      errors.cpassword = "Passwords do not match";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let errorMessage = '';
    if (name === 'username') {
      if (!value.trim()) {
        errorMessage = 'Username is required';
      }
    } else if (name === 'email') {
      const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!value.trim()) {
        errorMessage = 'Email is required';
      } else if (!regex.test(value)) {
        errorMessage = 'Invalid email format';
      }
    } else if (name === 'password') {
      if (!value) {
        errorMessage = 'Password is required';
      }
    } else if (name === 'cpassword') {
      if (!value) {
        errorMessage = 'Confirm Password is required';
      } else if (value !== user.password) {
        errorMessage = 'Passwords do not match';
      }
    }

    // Update the state with the new value
    setUserDetails(prevUser => ({
      ...prevUser,
      [name]: value,
    }));

    // Update the form errors separately
    setFormErrors(prevErrors => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(user);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      axios
        .post(`${baseApi}/account/signup`, { username: user.username, email: user.email, password: user.password })
        .then((res) => {
          if(res.status === 202) {
            alert("User signed up successfully. A mail has been sent to you for verification. Please verify your email and login.");
            navigate("/account/login", { replace: true });
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            alert("This email has been registered already. Please login.");
            navigate("/account/login", { replace: true });
          } else if(error.response.status === 500){
            alert('Server error!');
            navigate("/", { replace: true });
            setAccount(false);
          }
        });
    }
  };

  return (
    <div className={baseStyle.account}>
      <div className={registerStyle.register}>
        <form>
          <h1>Create your account</h1>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={user.username}
          />
          {formErrors.username && (
            <p className={baseStyle.error}>{formErrors.username}</p>
          )}
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
          <input
            type="password"
            name="cpassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={user.cpassword}
          />
          {formErrors.cpassword && (
            <p className={baseStyle.error}>{formErrors.cpassword}</p>
          )}
          <button className={baseStyle.button_common} onClick={handleSubmit}>
            Register
          </button>
        </form>
        <Link to="/account/login">Already registered? Login</Link>
      </div>
    </div>
  );
};

export default Register;
