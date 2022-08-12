import React from "react";
import "./home.css";
import Explore from "../components/explore";
import Feed from "../components/feed";
import Messanger from "../components/messanger";
import Navbar from "../components/navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import PostCreator from "../components/postCreator";
const Home = () => {
  let { id } = useParams();
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
  }, []);

  if (user)
    return (
      <div className="home">
        <Navbar />
        <div className="home-container ">
          <div className="home__explore">
            <Explore  id={id} />
          </div>
          <div className="home__feed">
            <PostCreator />
            <Feed parent={"timeline"} id={id} />
          </div>
          <div className="home__messanger">
            <Messanger id={id} />
          </div>
        </div>
      </div>
    );
};

export default Home;
