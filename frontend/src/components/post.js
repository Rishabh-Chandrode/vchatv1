import React from 'react'
import './post.css'
import noprofile from "../assests/images/noprofile.png"
const Post = () => {
  return (
    <div className='post'>
        <div className='post__header'>
            <div className='post__header__profilePicture__container'>
                <img src={noprofile} alt='profile' className='post__header__profilePicture'/>
            </div>
            <div className='post__header__title'>
                username
            </div>
        </div>
        <div className='post__body'>
            <div className='post__body__content'>
                <div className='post__body__content__image__container'>
                    <img className='post__body__content__image' src='https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' alt='post' />
                </div>

                <div className='post__body__content__text'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Post