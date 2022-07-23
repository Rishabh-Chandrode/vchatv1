import React from 'react'
import './feed.css'
import Post from './post'
const Feed = () => {
  return (
    <div className='feed'>
      <div className='feed__header'>
        <div className='feed__header__title'>
          Feed
        </div>
      </div>
      <div className='feed__body'>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  )
}

export default Feed