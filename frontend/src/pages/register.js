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
        navigate(`/${response.user._id}/timeline`);

        // await AuthService.signup(username, email, password)
        // .then(function (response) {
        //   console.log(response.data);
        
        //   if(!response){
        //     alert("NO response from server");
        //   }else{
        //   navigate(`/${response.data.user._id}/timeline`);
        //   }
        // })
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
              <div className="register__body__item__input">
                <input
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
              <div className="register__body__item__input">
                <input
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
              <div className="register__body__item__input">
                <input
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
              <div className="register__body__item__input">
                <input
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
            <div className="login__body__item">
              <button
                onClick={handelregister}
                className="login__body__item__button"
              >
                Register
              </button>
            </div>
          </div>
        </form>
        <Link to="/">
        <div className="login__button">
          Login
        </div>
        </Link>
      </div>
    </div>
  );
};

export default Register;
