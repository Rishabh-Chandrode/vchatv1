import React from 'react'
import './login.css'

const Login = () => {
  return (
    <div className="login">
        <div className='login__wrapper' >
            <div className="login__header">
                <div className="login__header__title">Login</div>
            </div>
            <div className="login__body">
                <div className="login__body__item">
                    <div className="login__body__item__title">Username</div>
                    <input className="login__body__item__input" type="text" />
                </div>
                <div className="login__body__item">
                    <div className="login__body__item__title">Password</div>
                    <input className="login__body__item__input" type="password" />
                </div>
                <div className="login__body__item">
                    <button className="login__body__item__button">Login</button>
                </div>
            </div>
          </div>
    </div>
  )
}

export default Login