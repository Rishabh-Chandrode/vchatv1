import React, { useEffect } from 'react'
import './navbar.css'
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const logoutuser = () => {
    localStorage.removeItem('userId');
    navigate("/")
  }
  useEffect(()=> {
    if(!userId){
      alert("Please login to continue");
      navigate("/")
    }
  },[userId])
  return (
    <div className='navbar'>
      <div className='navbar__left'>
        Vchat
      </div>
      <div className='navbar__right'>

      <button onClick={logoutuser}>{userId?"Logout":"no user"}</button>
      </div>
      
    </div>
  )
}

export default Navbar