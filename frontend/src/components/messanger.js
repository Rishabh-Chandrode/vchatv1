import React from 'react'
import './messanger.css'
import noprofile from "../assests/images/noprofile.png"

const Messanger = () => {
  return (
    <div className='messanger'>
      <div className='messanger__header'>
        <div className='messanger__header__title'>
          Messanger
        </div>
      </div>
      <div className='messanger__body'>

            <div className='messanger__body__item'>
              <div className='messanger__body__item__profilePicture'>
                <img src={noprofile} className="messanger__profilePicture" alt="profilePicture" />
              </div>
              <div className='messanger__body__item__username'>username</div>
            </div>
            
            
            <div className='messanger__body__item'>
              <div className='messanger__body__item__profilePicture'>
                <img src={noprofile} className="messanger__profilePicture" alt="profilePicture" />
              </div>
              <div className='messanger__body__item__username'>username</div>
            </div>
            
            
            <div className='messanger__body__item'>
              <div className='messanger__body__item__profilePicture'>
                <img src={noprofile} className="messanger__profilePicture" alt="profilePicture" />
              </div>
              <div className='messanger__body__item__username'>username</div>
            </div>
            
            
            <div className='messanger__body__item'>
              <div className='messanger__body__item__profilePicture'>
                <img src={noprofile} className="messanger__profilePicture" alt="profilePicture" />
              </div>
              <div className='messanger__body__item__username'>username</div>
            </div>
            
            

        </div>
    </div>
  )
}

export default Messanger