import React from 'react'
import Feed from '../components/feed'
import {  useParams } from 'react-router-dom';
import axios from "axios";
import {useState , useEffect} from "react";
import "./userprofile.css"

const UserProfile = () => {
  let { id } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    
      try{
        async function getuser(){  
          await axios.get(`http://localhost:5000/api/users/${id}`).then((res) => {
            setUser(res.data);
          })
        }
        getuser();
      }catch(err){
        console.log(err);
      } 
     
    
  },[id]);
  if(user)
  return (      
    <div className='userprofile'>
      <div className='userprofile__header'>
        <div className='userprofile__header__bio'>
          <div className='userprofile__header__bio__avatar__container'>
            <img className='userprofile__header__bio__avtar' src='https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' alt='avatar' />
          </div>
          <div className='userprofile__header__bio__info__container'>
            <h1>{user.username}</h1>
            <p>Full Stack Developer</p>
          </div>
        </div>
      </div>
      <div className='userprofile__body'>
        <Feed id={id}/>
      </div>
    </div>
  )
}

export default UserProfile