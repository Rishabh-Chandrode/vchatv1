import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./login.css";
import authService from "../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const [inputField, setInputField] = useState({
    email: "",
    password: "",
  });
  const inputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };
  const submitButton = async () => {
    if (!inputField.email || !inputField.password) {
      alert("Please fill all the fields");
    } else {
      try {
        const response = await authService.login(
          inputField.email,
          inputField.password
        );
        localStorage.setItem("userId", response._id);
        localStorage.setItem("userName", response.username);
        navigate(`/${response._id}/timeline`);
      } catch (err) {
        console.log(err);
        alert(err.response.data);
      }
    }
  };

  return (
    <div className="login">
      <div className="login__wrapper">
        <div className="login__header">
          <div className="login__header__title">Login</div>
        </div>

        <div className="login__body">
          <div className="login__body__item">
            <div className="login__body__item__title">Email</div>
            <input
              autoComplete="off"
              type="email"
              name="email"
              onChange={inputHandler}
              placeholder="Email"
              value={inputField.email || ""}
              className="login__body__item__input"
            />
          </div>
          <div className="login__body__item">
            <div className="login__body__item__title">Password</div>
            <input
              name="password"
              onChange={inputHandler}
              placeholder="password"
              value={inputField.password || ""}
              className="login__body__item__input"
              type="password"
            />
          </div>
          <div className="login__body__item">
            <div className="login__button__wrapper">

            <button
              onClick={submitButton}
              className="login__button"
              >
              Login
            </button>
              </div>
          </div>
          <div className="login__body__item">
            <div className="signup__button">

            Not a user? <Link to={"/signup"}>SignUp</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
