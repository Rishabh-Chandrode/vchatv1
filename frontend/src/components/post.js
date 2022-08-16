import React from "react";
import "./post.css";
import noprofile from "../assests/images/noprofile.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import axios from "axios";

const Post = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const currentUserId = localStorage.getItem("userId");
  const [colorClass, setColorClass] = useState("notLikedButton");
  const [likeCount, setLikeCount] = useState();

  const handleLike = async () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikeCount(likeCount + 1);

      setColorClass("likedButton");
      const response = await axios({
        method: "put",
        url: `http://localhost:5000/api/posts/${post._id}/like`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { userId: currentUserId },
      });
    } else {
      setIsLiked(false);
      setLikeCount(likeCount - 1);
      setColorClass("notLikedButton");
      const response = await axios({
        method: "put",
        url: `http://localhost:5000/api/posts/${post._id}/like`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { userId: currentUserId },
      });
    }
  };

  useEffect(() => {
    if (post.likes.includes(currentUserId)) {
      setIsLiked(true);
      setColorClass("likedButton");
    }
    setLikeCount(post.likes.length);
  }, []);

  return (
    <div className="post">
      <div className="post__header">
        <div className="post__header__profilePicture__container post__header__item">
          <img
            src={noprofile}
            alt="profile"
            className="post__header__profilePicture"
          />
        </div>
        <div className="post__header__title post__header__item">
          <Link
            to={`/userprofile/${post.userId}`}
            className="post__header__title__link"
          >
            {post.username}
          </Link>
        </div>
      </div>
      <div className="post__body">
        <div className="post__body__content">
          <div className="post__body__content__text">{post.desc}</div>

          <div className="post__body__content__image__container">
            {post.img ? <img src={post.img} className="post__body__content__image" alt="post" /> : 
            <img
              className="post__body__content__image"
              src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
              alt="post"
            /> 
          }
          </div>
        </div>
        <div className="post__body__actions">
          <div
            className={`post__body__actions__like post__body__actions__item + ${colorClass}`}
            onClick={handleLike}
          >
            {(() => {
              if (isLiked) {
                return (
                  <div>
                    <AiFillHeart />
                    Liked({likeCount})
                  </div>
                );
              } else {
                return (
                  <div>
                    <AiOutlineHeart />
                    Like({likeCount})
                  </div>
                );
              }
            })()}
          </div>
          <div className="post__body__actions__comment post__body__actions__item">
            Comment
          </div>
          <div className="post__body__actions__share post__body__actions__item">
            Share
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
