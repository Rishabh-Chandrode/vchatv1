import React from "react";
import axios from "axios";
import {useState , useEffect} from "react";
import { Link } from 'react-router-dom';
import noprofile from "../assests/images/noprofile.png";
import "./explore.css";

const Explore = () => {
  const [users, setUsers] = useState();
  const [isfetched,setIsFetched] = useState(false);
 
  useEffect(() => {
    if(!isfetched){
      try{
        async function getusers(){  
          await axios.get("http://localhost:5000/api/users/get/allusers").then((res) => {
            
            setUsers(res.data);
            
          })
        }
        getusers();
      }catch(err){
        console.log(err);
      } 
    }  
    setIsFetched(true);   
  },[users]);
  
  
  if(users)
  return (
    <div className="explore">
      <div className="explore__header">
        <div className="explore__header__title">Explore</div>
      </div>
      <div className="explore__body">
        

        {users.map((user) => 

        <Link to={`/userprofile/${user._id}`} key={user._id}>
          <div className="explore__body__item" >
            <div className="explore__body__item__profilePicture">
              <img
                src={noprofile}
                className="explore__profilePicture"
                alt="profilePicture"
              />
            </div>
            <div className="explore__body__item__username">
              {user.username}
            </div>
          </div>
        </Link>  
          


        )}
      </div>
    </div>
  );

}
  
 
export default Explore;
