// src/pages/Register.jsx

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle Input Change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // Handle Register
  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");
    setError("");

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      setMessage(res.data.message);

      // Clear Form
      setFormData({
        email: "",
        password: "",
      });

      // Redirect to Login Page
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {

      setError(
        error.response?.data?.message || "Registration Failed"
      );

    }

  };

  return (

    <div className="register-page">

      <div className="register-container">

        {/* Left Section */}
        <div className="register-left">

          <h1>Savings Blueprint</h1>

          <p>
            Create your account and start managing your
            income, expenses and savings smarter.
          </p>

        </div>

        {/* Right Section */}
        <div className="register-right">

          <form
            className="register-form"
            onSubmit={handleSubmit}
          >

            <h2>Register</h2>

            {/* Success Message */}
            {message && (
              <p className="success-message">
                {message}
              </p>
            )}

            {/* Error Message */}
            {error && (
              <p className="error-message">
                {error}
              </p>
            )}

            {/* Email */}
            <div className="form-group">

              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

            {/* Password */}
            <div className="form-group">

              <label>Password</label>

              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

            </div>

            {/* Button */}
            <button
              type="submit"
              className="register-btn"
            >
              Register
            </button>

          </form>

        </div>

      </div>

    </div>

  );

};

export default Register;