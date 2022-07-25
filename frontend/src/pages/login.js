import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import './login.css'

const Login = () => {
    const [inputField , setInputField] = useState({
        email: '',
        password: ''
    })

    

    const inputHandler = (e) =>{
        setInputField( {...inputField,[e.target.name]: e.target.value} )
        
        console.log(inputField.email)
        console.log(inputField.password)
    }

    const submitButton = () =>{
        var config = {
            method: 'post',
            url: 'http://localhost:5000/api/auth/login',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : inputField
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    
  return (
    <div className="login">
        <div className='login__wrapper' >
            <div className="login__header">
                <div className="login__header__title">Login</div>
            </div>
            
            <div className="login__body">
                <div className="login__body__item">
                    <div className="login__body__item__title">Email</div>
                    <input 
                    type="email" 
                    name="email" 
                    onChange={inputHandler} 
                    placeholder="Email" 
                    value={inputField.email || ''}
                    className="login__body__item__input"/>
                </div>
                <div className="login__body__item">
                    <div className="login__body__item__title">Password</div>
                    <input
                    name='password'
                    onChange={inputHandler}
                    placeholder='password'
                    value={inputField.password || ''} 
                    className="login__body__item__input" type="password" />
                </div>
                <div className="login__body__item">
                    <button onClick={submitButton} className="login__body__item__button">Login</button>
                </div>
            </div>
          </div>
    </div>
  )
}

export default Login