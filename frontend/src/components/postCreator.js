import React, { useState } from "react";
import "./postCreator.css";
import noprofile from "../assests/images/noprofile.png";
import axios from "axios";

const PostCreator = ({user}) => {
  const [newPost, setNewPost] = useState({
    name: "",
    desc: "",
    img: "",
  });
  const name = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");
  console.log(user)
  const handleSubmit = () => {
    
    
    const formData = new FormData();
    formData.append("name",name );
    formData.append("userId",userId);
    formData.append("desc", newPost.desc);
    formData.append("img", newPost.img);
    formData.append("ProfilePicture",user.profilePicture); 

    console.log(formData);
    axios
      .post("http://localhost:5000/api/posts/", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    setNewPost({ ...newPost, img: e.target.files[0] });
  };

  return (
    <div className="postCreator">
      <form className="form" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="postCreator__upper">
          <div className="postCreator__avatar__container">
            {
              user.profilePicture ? <img src={"http://localhost:5000/images/" + user.profilePicture} alt="profile" className="explore__profilePicture" /> : <img src={noprofile} alt="noprofile" className="explore__profilePicture" />
            }
            
          </div>

          <div className="postCreator__text__input__container">
            <textarea
              className="postCreator__text__input"
              type="text"
              placeholder="Write a post"
              name="desc"
              value={newPost.desc}
                onChange={handleChange}
            />
          </div>
        </div>
        <div className="postCreator__lower">
          <div className="postCreator__attachments__images postCreator__attachments">
            <label htmlFor="imgFile" className="postCreator__attachments">
              Images
            </label>
            <input 
              id="imgFile" 
              type="file" 
              style={{ display: "none" }} 
              onChange={handlePhoto}
            />
          </div>
          
          
          <button className="postCreator__postButton" type="submit">
            Post
          </button>
        </div>
      </form>
      {
        newPost.img? <img className="upload__image" src={URL.createObjectURL(newPost.img)} alt=""/>:null
      }
    </div>
  );
};

export default PostCreator;
