import React from "react";
import "./register.css";

import { useNavigate, Link } from "react-router-dom";
import { useState} from "react";
import AuthService from "../services/authService.js"

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handelregister = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill all the fields");
    }
    if (password !== confirmPassword) {
      alert("passwords do not match");
    }else if(password.length < 6){
      alert("password must be at least 6 characters long");
    }
    else {
      try{
        const response = await AuthService.signup(username, email, password);
        console.log(response.user._id);
        if(response.acessToken){
          localStorage.setItem("user", JSON.stringify(response));
        }
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        localStorage.setItem('userId', response.user._id);
            localStorage.setItem('userName', response.user.username);
            
        navigate(`/${response.user._id}/timeline`);

        
      }catch(err){
        console.log(err);
      }
        
          
      
    }
  };

  return (
    <div className="register">
      <div className="register__wrapper">
        <div className="register__header">
          <div className="register__header__title">Register</div>
        </div>
        <form>
          <div className="register__body">
            <div className="register__body__item">
              <label htmlFor="username" className="register__body__item__title">
                Username
              </label>
              <div className="register__body__item__input__wrapper">
                <input
                  className="form__input"
                  type="text"
                  placeholder="Username"
                  id="username"
                  autoComplete="off"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username || ""}
                  required
                />
              </div>
            </div>
            <div className="register__body__item">
              <label htmlFor="email" className="register__body__item__title">
                Email
              </label>
              <div className="register__body__item__input__wrapper">
                <input
                className="form__input"
                  type="email"
                  placeholder="Email"
                  id="email"
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email || ""}
                  required
                />
              </div>
            </div>
            <div className="register__body__item">
              <label htmlFor="password" className="register__body__item__title">
                Password
              </label>
              <div className="register__body__item__input__wrapper">
                <input
                className="form__input"
                  type="password"
                  placeholder="Password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password || ""}
                  required
                />
              </div>
            </div>
            <div className="register__body__item">
              <label
                htmlFor="confirmPassword"
                className="register__body__item__title"
              >
                Confirm Password
              </label>
              <div className="register__body__item__input__wrapper">
                <input
                className="form__input"
                  type="password"
                  placeholder="Confirm Password"
                  id="confirmPassword"
                  autoComplete="off"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword || ""}
                  required
                />
              </div>
            </div>
            <div className="register__body__item">
              <button
                onClick={handelregister}
                className="register__body__item__button"
              >
                Register
              </button>
            </div>
          </div>
        </form>
        
        Already Registered ?
        <div className="register__login__button">
        <Link to="/">
          Login
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
