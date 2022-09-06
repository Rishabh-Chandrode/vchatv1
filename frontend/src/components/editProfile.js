import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import "./editProfile.css";
import noprofile from "../assests/images/noprofile.png";
import axios from "axios";

const EditProfile = () => {

    const params = useParams();
    const navigate = useNavigate();
    const currentUserId = localStorage.getItem("userId");
    if(params.id !== currentUserId){
        alert("You are not authorized to edit this profile");
        navigate('/');
    }

    const location = useLocation();
    //console.log(location.state);
    const previmgurl = location.state.user.profilePicture; 
    const [userData,setUserData] = useState({
        username : location.state.user.username,
        desc: location.state.user.desc || "",
        img: location.state.user.profilePicture || "",
        
    })
  //  console.log(userData);
   
    const handlePhoto = (e) => {
        setUserData({ ...userData, img: e.target.files[0] });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("username",userData.username );
        formData.append("desc", userData.desc);
        formData.append("img", userData.img);
        formData.append("previmgurl", previmgurl);
        

        axios
          .put(`http://localhost:5000/api/users/${currentUserId}`, formData)
          .then((res) => {
            console.log(res);
            navigate(`/userprofile/${currentUserId}`)
          })
          .catch((err) => {
            console.log(err);
          });
      }

    



  return (
         <form className="form" onSubmit={handleSubmit} encType="multipart/form-data">
    <div className="editProfile">
      <div className="editProfile__container">
        <div className="editProfile__container__header">
          <h1>Edit Profile</h1>
        </div>
        <div className="editProfile__container__body">
       
          <div className="editProfile__container__body__avatar__container">
            <label for="avatar">
                {userData.img 
                ? (location.state.user.profilePicture !== userData.img ? <img src={URL.createObjectURL(userData.img)} alt="avatar" className="editProfile__container__body__avatar" />
                :
                <img src={"http://localhost:5000/images/" + userData.img} className="editProfile__container__body__avatar" alt="profilePicture" />
                )
                 
                :
                 <img src={noprofile} className="editProfile__container__body__avatar" alt="profilePicture" />}
           
            </label>
            <input type="file" id="avatar" name="avatar" onChange={handlePhoto} className="input__avatar" />
          </div>
          <div className="editProfile__container__body__info">
            <div className="editProfile__container__body__info__username">
              <label htmlFor="username">Username</label>
              <br />
              <input
                className="editProfile__username__input"
                type="text"
                name="username"
                id="username"
                placeholder="username"
                value={userData.username}
                onChange={(e) => setUserData({...userData,username:e.target.value})}
              />
            </div>
            <div className="editProfile__container__body__info__bio">
              <label htmlFor="bio">Bio</label>
              <br />

              <textarea
                className="editProfile__bio__input"
                type="text"
                placeholder="Bio"
                name="bio"
                id="bio"
                value={userData.desc}
                onChange={(e) => setUserData({...userData,desc:e.target.value})}
              />
            </div>
            <button className="editProfile__container__body__info__button">
                cancel
            </button>
            <button type="submit" className="editProfile__container__body__info__button">
                Update
            </button>
          </div>
        </div>
      </div>
    </div>
          </form>
  );
};

export default EditProfile;
