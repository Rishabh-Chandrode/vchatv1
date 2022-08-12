import React, { useState } from "react";
import "./postCreator.css";
import noprofile from "../assests/images/noprofile.png";
import axios from "axios";
import postService from "../services/postService";

const PostCreator = () => {
  const [postContent, setPostContent] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postContent) {
      alert("can't post empty post");
    }
    const currentUserId = localStorage.getItem("userId"); 

    try{
      const response = await postService.createPost(postContent);
      console.log(response);
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="postCreator">
      <div className="postCreator__upper">
        <div className="postCreator__avatar__container">
          <img
            src={noprofile}
            className="explore__profilePicture"
            alt="profilePicture"
          />
        </div>

        <div className="postCreator__text__input__container">
          <textarea
            className="postCreator__text__input"
            type="text"
            placeholder="Write a post"
            value={postContent}
            onChange = { (e) => {setPostContent(e.target.value)} }
          />
        </div>
      </div>
      <div className="postCreator__lower">
        <div className="postCreator__attachments__images">images</div>
        <div className="postCreator__attachments__videos">Videos</div>
        <div className="postCreator__attachments__audios">Audios</div>
        <button className="postCreator__postButton" onClick={handleSubmit}>Post</button>
      </div>
    </div>
  );
};

export default PostCreator;
