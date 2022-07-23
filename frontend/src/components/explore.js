import React from "react";
import axios from "axios";
import {useState , useEffect} from "react";
import noprofile from "../assests/images/noprofile.png";
import "./explore.css";

const Explore = () => {
  const [users, setUsers] = useState();
  const [isfetched,setIsFetched] = useState(false);
 
  useEffect(() => {
    if(!isfetched){
      try{
        async function getusers(){  
          await axios.get("api/users/get/allusers").then((res) => {
            
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
          <div className="explore__body__item" key={user._id}>
            <div className="explore__body__item__profilePicture">
              <img
                src={noprofile}
                className="explore__profilePicture"
                alt="profilePicture"
              />
            </div>
            <div className="explore__body__item__username">{user.username}</div>
          </div>
        )}
      </div>
    </div>
  );

}
  
 
export default Explore;
