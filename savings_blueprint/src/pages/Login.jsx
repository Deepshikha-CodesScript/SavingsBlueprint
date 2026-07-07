// src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { loadFacebookSDK }
  from "../utils/facebookSDK";


const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try { const res = await axios.post("http://localhost:5000/api/auth/login", { email: formData.email, password: formData.password, });

      // Success Message
      alert(res.data.message);
      // Save Token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Authentication State
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);

      // Redirect
      navigate("/");
    } catch (error) {

      setError(
        error.response?.data?.message || "Login Failed"
      );

    }
  };

// Google Login Success
const handleSuccess = async (credentialResponse) => {
  try {
    console.log("Google Response:", credentialResponse);

    const res = await axios.post(
      "http://localhost:5000/api/authr/google",
      {
        credential: credentialResponse.credential,
      }
    );

    localStorage.setItem("token", res.data.token);
    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );
    localStorage.setItem(
      "isAuthenticated",
      "true"
    );

    setIsAuthenticated(true);
    navigate("/");
  } catch (err) {
    console.error(
      "Google Login Error:",
      err
    );

    setError(
      err.response?.data?.message ||
        "Google Login Failed"
    );
  }
};

// Facebook Response Handler
const handleFacebookResponse = async (
  response
) => {
  try {
    if (!response.authResponse) {
      setError("Facebook Login Cancelled");
      return;
    }

    const res = await axios.post("http://localhost:5000/api/authrf/facebook",{accessToken:response.authResponse.accessToken,});

    localStorage.setItem(
      "token",
      res.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    localStorage.setItem(
      "isAuthenticated",
      "true"
    );

    setIsAuthenticated(true);

    navigate("/");
  } catch (error) {
    console.error(
      "Facebook Login Error:",
      error.response?.data || error.message
    );

    setError(
      error.response?.data?.message ||
        "Facebook Login Failed"
    );
  }
};

// Facebook Login Button Handler
const handleFacebookLogin = async () => {
  try {
    const FB = await loadFacebookSDK();

    FB.login(
      (response) => {
        handleFacebookResponse(
          response
        );
      },
      {
        scope:
          "public_profile,email",
      }
    );
  } catch (error) {
    console.error(
      "Facebook Login Error:",
      error.response?.data || error.message
    );

    setError(
      error.response?.data?.message ||
        "Facebook Login Failed"
    );
  }
};
  
  return (
    <div className="login-page">
      <div className="login-container">

        {/* Left Section */}
        <div className="login-left">
          <h1>Savings Blueprint</h1>

          <p>
            Plan your income, track expenses, manage savings and achieve your
            financial goals smarter.
          </p>
        </div>

        {/* Right Section */}
        <div className="login-right">

          <form className="login-form" onSubmit={handleSubmit}>

            <h2>Login</h2>

            {error && (
              <p className="login-error">
                {error}
              </p>
            )}

            {/* Email */}
            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter email"
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
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

           {/* Login Button */}
          <button type="submit" className="login-btn">
              Login
          </button>

          {/* Register Link */}
          <p className="register-text">
              Don't have an account?{" "}

          <Link to="/register" className="register-link">
              Register
          </Link>

          </p>
<div className="social-login-container">
  <div className="google-login-wrapper">
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => {
        console.log("Login Failed");
        setError("Google Login Failed");
      }}
    />
  </div>

  <div className="social-divider">
    <span>OR</span>
  </div>

  <button
    type="button"
    className="facebook-btn"
    onClick={handleFacebookLogin}
  >
    Continue with Facebook
  </button>
</div>

          </form>
          

        </div>
        
      </div>
     
    </div>
  );
};

export default Login;