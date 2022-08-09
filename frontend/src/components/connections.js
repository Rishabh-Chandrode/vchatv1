import React from 'react'
import "./connections.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import noprofile from "../assests/images/noprofile.png";



const Connections = () => {
  const currentUserId = localStorage.getItem('userId');
  const [users, setUsers] = useState([]);
  const [isfollowing, setIsfollowing] = useState(true);

  const getFollowings =  () => {
    setIsfollowing(true);
  };
  const getFollowers = async () => {
    setIsfollowing(false);
  };




  useEffect(() => {
    
  const getConnections = async () => {
    try{
      const connections = isfollowing?"followings":"followers";
      const response = await axios.get(`http://localhost:5000/api/users/${currentUserId}/${connections}`);
      setUsers(response.data);
    }catch(err){
      console.log(err);
    }
  }
  getConnections();
  },[isfollowing]);


  const handleUnfollow = async (id) => {
    try{
      const response = await axios.put(`http://localhost:5000/api/users/${id}/unfollow`,{userId:currentUserId});
      console.log(response.data);
      
    }catch(err){
      console.log(err);
    }
  }

  const handleRemove = async (id) => {
    try{
      const response = await axios.put(`http://localhost:5000/api/users/${currentUserId}/unfollow`,{userId:id});
      console.log(response.data);
    }catch(err){
      console.log(err);
    }
  }





  return (
    <div className='connections'>
      <div className='connections__header'>
        <div className='connections__header__title'>
          <div className='connections__header__title__followers'>
            <button onClick={getFollowings} className='connections__header__title__followers__button'>Followings</button>
          </div>
          <div className='connections__header__title__following'>
            <button onClick={getFollowers} className='connections__header__title__following__button'>Followers</button>
          </div>
        </div>
      </div>
      <div className='connections__body'>
      {
        users.length===0?"No user found":
      users.map((user) => (
            <div className="explore__body__item" key={user._id}>
              <div className="explore__body__item__profilePicture">
                <img
                  src={noprofile}
                  className="explore__profilePicture"
                  alt="profilePicture"
                />
              </div>
              <div className="explore__body__item__username">
                <Link to={`/userprofile/${user._id}`} key={user._id}>
                  {user.username}
                </Link>
              </div>
              {
                ( () => {
                  if(isfollowing){
                    return <button  id={user._id} onClick={() => {handleUnfollow(user._id)}}>Unfollow</button>
                  }else{
                    return <button  id={user._id} onClick={() => {handleRemove(user._id)}}>Remove</button>
                  }
                } )()
              }
              
            </div>
          ))}
      </div>
    </div>
  )
}

export default Connections