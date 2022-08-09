import React from 'react'
import Feed from '../components/feed'
import {  useParams } from 'react-router-dom';
import axios from "axios";
import {useState , useEffect} from "react";
import "./userprofile.css"
import Connections from './connections';

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
            <div className='userprofile__header__bio__info__username'>
              {user.username}
            </div>
            <div className='userprofile__header__bio__info__bio'>
              this is user bio
            </div>
            <div className='userprofile__header__bio__info__followersinfo'>
              <div className='userprofile__header__bio__info__followersinfo__followers'>
                {user.followers.length} followers
              </div>
              <div className='userprofile__header__bio__info__followersinfo__following'>
                {user.followings.length} following
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className='userprofile__body'>
        <div className='userprofile__feed'>
        <Feed parent={"allposts"} id={id}/>
        </div>
        <div className='userprofile__friends'>
        <Connections/>
        </div>

      </div>
    </div>
  )
}

export default UserProfile