import React, { useEffect } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const logoutuser = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/");
  };
  useEffect(() => {
    if (!userId) {
      alert("Please login to continue");
      navigate("/");
    }
  }, [userId]);
  return (
    <div className="navbar">
      <div className="navbar__left">
      <Link className="navbar__right__username" to={`/${userId}/timeline`}>
                    VChat
                  </Link>
      </div>
      <div className="navbar__right">
        
        <Link className="navbar__right__username" onClick={window.location.reload} to={`/userprofile/${userId}`}>
                    {userName}
                  </Link>
       
        
        <button onClick={logoutuser} className="navbar__right__logout">{userId ? "Logout" : "no user"}</button>
      </div>
    </div>
  );
};

export default Navbar;
