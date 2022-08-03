import React from 'react'
import './messanger.css'
import axios from "axios";
import {useState , useEffect} from "react";
import noprofile from "../assests/images/noprofile.png"

const Messanger = () => {
  const [users, setUsers] = useState();
  const [isfetched,setIsFetched] = useState(false);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    if(!isfetched){
      try{
        async function getusers(){  
          await axios.get(`http://localhost:5000/api/users/${userId}/followers`).then((res) => {
            console.log(res.data);
            setUsers(res.data);
            
          })
        }
        getusers();
      }catch(err){
        console.log(err);
      } 
    }  
    setIsFetched(true);   
  },[users]);
  
  
  if(users)
  return (
    <div className='messanger'>
      <div className='messanger__header'>
        <div className='messanger__header__title'>
          Messanger
        </div>
      </div>
      <div className='messanger__body'>
      {users.map((user) => 
            <div className='messanger__body__item' key={user._id}>
              <div className='messanger__body__item__profilePicture'>
                <img src={noprofile} className="messanger__profilePicture" alt="profilePicture" />
              </div>
              <div className='messanger__body__item__username'>{user.username}</div>
            </div>
      )}      
      
        </div>
    </div>
  )
}

export default Messanger