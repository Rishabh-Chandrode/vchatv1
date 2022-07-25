import React from 'react'
import Explore from '../components/explore'
import Navbar from '../components/navbar'
import UserProfile from '../components/userprofile'
import './profile.css'

const Profile = () => {
  return (
    <div className='profile'>
        <Navbar />
        <div className='profile-container'>
        <Explore />
        <UserProfile />
        
        </div>

    </div>
  )
}

export default Profile