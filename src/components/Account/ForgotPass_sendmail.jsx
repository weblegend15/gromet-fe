import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import baseStyle from "./Base.module.css";
import forgotpass_sendmailStyle from "./ForgotPass_sendmail.module.css";
import { baseApi } from '../../constants';

const ForgotPass_sendmail = ({ setAccount }) => {
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

    return errors;
  };

  const handleSend = (e) => {
    e.preventDefault();
    const errors = validateForm(user);
    console.log(errors)
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      axios
        .post(`${baseApi}/account/forgot-password`, { email: user.email})
        .then((res) => {
          if (res.status === 202) {
            alert("Password Reset Link Sent to " + user.email + " Successfully");
            //navigate("/account/login", { replace: true });
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            alert("Not Registered Email");
          }
        });
    }

  };

  return (
    <div className={baseStyle.account}>
      <div className={forgotpass_sendmailStyle.forgotpass}>
        <form>
          <h1>Send Mail</h1>
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
          <button className={baseStyle.button_common} onClick={handleSend}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPass_sendmail;
