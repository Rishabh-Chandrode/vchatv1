import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import noprofile from "../assests/images/noprofile.png";
import "./explore.css";

const Explore = () => {
  const { id } = useParams();
  const currentUserId = localStorage.getItem("userId");
  const [users, setUsers] = useState();

  const [isfetched, setIsFetched] = useState(false);

  const followUser = async (event) => {
    try {
      const response = await axios({
        method: "put",
        url: `http://localhost:5000/api/users/${event.target.id}/follow`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { userId: id },
      });
      window.location.reload();
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const unfollowUser = async (event) => {
    try {
      const response = await axios({
        method: "put",
        url: `http://localhost:5000/api/users/${event.target.id}/unfollow`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { userId: id },
      });
      window.location.reload();
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!isfetched) {
      try {
        async function getusers() {
          await axios
            .get(`http://localhost:5000/api/users/${id}/explore`)
            .then((res) => {
              setUsers(res.data);
            });
        }
        getusers();
      } catch (err) {
        console.log(err);
      }
    }
    setIsFetched(true);
  }, [users]);

  if (users)
    return (
      <div className="explore">
        <div className="explore__header">
          <div className="explore__header__title">Explore</div>
        </div>
        <div className="explore__body">
          {users.map((user) => (
            user._id===currentUserId ? null :  
            <div className="explore__body__item" key={user._id}>
              <div className="explore__body__item__left">
                <div className="explore__body__item__profilePicture">
                  <img
                    src={noprofile}
                    className="explore__profilePicture"
                    alt="profilePicture"
                  />
                </div>
                <div className="explore__body__item__username">
                  <Link to={`/userprofile/${user._id}`} key={user._id}>
                    {user.username}
                  </Link>
                </div>
              </div>
              <div className="explore__body__item__right">
                <div className="explore__body__item__button">
                  <button
                    id={user._id}
                    onClick={
                      user.followers.includes(currentUserId)
                        ? unfollowUser
                        : followUser
                    }
                  >
                    {user.followers.includes(currentUserId)
                      ? "Unfollow"
                      : "Follow"}
                  </button>
                </div>
              </div>
            </div>
            
          ))}
        </div>
      </div>
    );
};

export default Explore;
