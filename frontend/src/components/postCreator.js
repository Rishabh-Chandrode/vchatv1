import React, { useState } from "react";
import "./postCreator.css";
import noprofile from "../assests/images/noprofile.png";
import axios from "axios";
import postService from "../services/postService";

const PostCreator = () => {
  const [postDesc, setPostDesc] = useState("");

  const [baseImage, setBaseImage] = useState("");

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    const img = JSON.stringify(base64);
    setBaseImage(base64);
    //console.log(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const [isPosting, setIsPosting] = useState(true);

  const handleSubmit = async (e) => {
    try {
      const userId = localStorage.getItem("userId");
      setIsPosting(false);
      const response = await postService.createPost(
        postDesc,
        baseImage,
        userId
      );
      console.log(response);

      setBaseImage("");
      setPostDesc("");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

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
            name="desc"
            value={postDesc}
            onChange={(e) => setPostDesc(e.target.value)}
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
            onChange={(e) => {
              uploadImage(e);
            }}
          />
        </div>
        <div className="postCreator__attachments__videos postCreator__attachments">
          Videos
        </div>
        <div className="postCreator__attachments__audios postCreator__attachments">
          Audios
        </div>
        <button
          className="postCreator__postButton"
          onClick={handleSubmit}
          type="button"
        >
          Post
        </button>
      </div>

      {isPosting && baseImage && (
        <img src={baseImage} className="post__body__content__image" />
      )}
      {!isPosting && baseImage && <div>plese wait</div>}
    </div>
  );
};

export default PostCreator;
