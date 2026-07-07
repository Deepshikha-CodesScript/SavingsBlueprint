import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { loadFacebookSDK } from "../utils/facebookSDK";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      alert(res.data.message);

      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };
  

  const handleGoogleRegister = async (
  credentialResponse
) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/authr/google",
      {
        credential:
          credentialResponse.credential,
      }
    );

    alert("Google Registration Successful");

    localStorage.setItem(
      "token",
      res.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    navigate("/");
  } catch (err) {
    console.error(err);
    setError("Google Registration Failed");
  }
};

const handleFacebookRegister = async () => {
  try {
    const FB = await loadFacebookSDK();

    FB.login(
      function (response) {
        console.log("FB Response:", response);

        if (response.authResponse) {
          axios
            .post(
              "http://localhost:5000/api/authrf/facebook",
              {
                accessToken:
                  response.authResponse
                    .accessToken,
              }
            )
            .then((res) => {localStorage.setItem("token",res.data.token);

              localStorage.setItem("user",JSON.stringify(res.data.user));

              alert(
                "Facebook Registration Successful"
              );

              navigate("/");
            })
            .catch((err) => {
              console.error(err);
              setError(
                "Facebook Registration Failed"
              );
            });
        } else {
          console.log(
            "User cancelled Facebook login"
          );
        }
      },
      {
        scope: "email,public_profile",
      }
    );
  } catch (err) {
    console.error(err);
    setError("Facebook Login Failed");
  }
};
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <h1>Savings Blueprint</h1>

          <p>
            Create your account and start managing
            income, savings, investments and goals.
          </p>
        </div>

        <div className="login-right">
          <form
            className="login-form"
            onSubmit={handleSubmit}
          >
            <h2>Register</h2>

            {error && (
              <p className="login-error">
                {error}
              </p>
            )}

            <div className="form-group">
              <label>Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

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

            <div className="form-group">
              <label>Confirm Password</label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="login-btn"
            >
              Register
            </button>

            <div
  style={{
    marginTop: "15px",
    display: "flex",
    justifyContent: "center",
  }}
>
  <button
    type="button"
    onClick={handleFacebookRegister}
     className="facebook-btn" >
    Continue with Facebook
  </button>
</div>

            <div
  style={{
    marginTop: "15px",
    display: "flex",
    justifyContent: "center",
  }}
>
  <GoogleLogin
    onSuccess={handleGoogleRegister}
    onError={() =>
      console.log("Google Login Failed")
    }
  />
</div>

            <p className="register-text">
              Already have an account?{" "}
              <Link
                to="/login"
                className="register-link"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;