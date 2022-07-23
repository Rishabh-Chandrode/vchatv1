import React from 'react'
import './home.css'
import Explore from '../components/explore'
import Feed from '../components/feed'
import Messanger from '../components/messanger'
import Navbar from '../components/navbar'

const Home = () => {
  return (
    <div className="home">
      <Navbar />
    <div className='home-container '>
        <Explore className='home-explore' />
        <Feed className="home-feed"/>
        <Messanger className="home-messanger" />
    </div>
    </div>
  )
}

export default Home ;