import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../config/routes";
import { useDispatch } from "react-redux";
import { resetBackDrop, showBackDrop } from "../store/models/backDrop";
import { authenticate } from "../store/models/user";
import { showMessage } from "../store/models/messageBar";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    //login logic
    const loginBody = {
      email: loginData.email,
      password: loginData.password,
    };
    try {
      dispatch(showBackDrop());
      const response = await axios.post(
        "https://fixhealth-serverrework.onrender.com/login",
        loginBody
      );
      if (!response.data.error) {
        dispatch(
          authenticate({
            authenticated: true,
            email: response.data.email,
            name: response.data.name,
            userType: response.data.userType,
            token: response.data.token,
          })
        );
        setLoginData({
          email: "",
          password: "",
        });
        navigate(ROUTES.dashboard + response.data.userType);
      } else {
        dispatch(
          showMessage({
            message:
              response.data.message ?? "Something went wrong please try again!",
            type: "error",
            duration: 3000,
            active: true,
          })
        );
      }
      dispatch(resetBackDrop());
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
          </label>
          <button type="submit">Login</button>
          <p className="text-center">
            Dont have an account? <Link to={ROUTES.signin}>Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
