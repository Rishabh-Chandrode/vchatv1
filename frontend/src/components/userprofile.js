import React from "react";
import Feed from "../components/feed";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "./userprofile.css";
import Connections from "./connections";
import { Link } from "react-router-dom";

const UserProfile = () => {
  let { id } = useParams();
  const currentUserId = localStorage.getItem("userId");
  const [user, setUser] = useState();

  useEffect(() => {
    try {
      async function getuser() {
        await axios.get(`http://localhost:5000/api/users/${id}`).then((res) => {
          setUser(res.data);
        });
      }
      getuser();
    } catch (err) {
      console.log(err);
    }
  }, [id]);
  if (user)
    return (
      <div className="userprofile">
        <div className="userprofile__header">
          <div className="userprofile__header__bio">
            <div className="userprofile__header__bio__avatar__container">
              {user.profilePicture?(
                <img src={"http://localhost:5000/images/" + user.profilePicture} alt="profile" className="userprofile__header__bio__avtar" />
              ):(
                <img className="userprofile__header__bio__avtar" src="https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png" alt="profile" />
              )}
             
            </div>
            <div className="userprofile__header__bio__info__container">
              <div className="userprofile__header__bio__info__username">
              <div className="edit__profile__button">
                  {currentUserId === id ? (
                    <Link to={`/editprofile/${id}`} state = {{user}}>
                      

                    <button className="edit__profile__button__button">
                      Edit Profile
                    </button>
                    </Link>
                  ) : (
                    null)
                  }
                </div>
                {user.username}
              </div>
              <div className="userprofile__header__bio__info__bio">
                {user.desc}
              </div>
              <div className="userprofile__header__bio__info__followersinfo">
                <div className="userprofile__header__bio__info__followersinfo__followers">
                  {user.followers.length} followers
                </div>
                <div className="userprofile__header__bio__info__followersinfo__following">
                  {user.followings.length} following
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="userprofile__body">
          <div className="userprofile__feed">
            <Feed parent={"allposts"} user={user} Id={id} />
          </div>
          {id === currentUserId ? (
            <div className="userprofile__friends">
              <Connections />
            </div>
          ) : null}
        </div>
      </div>
    );
};

export default UserProfile;
