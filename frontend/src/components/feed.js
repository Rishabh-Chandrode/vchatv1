import React from 'react'
import './feed.css'
import Post from './post'
import axios from "axios";
import {useState , useEffect} from "react";

  const Feed = ({id}) => {
    if(!id) {
      id = "62dc560cd2d584eb74f85cb1";
    }
    
  const [posts, setPosts] = useState();
  const [isfetched,setIsFetched] = useState(false);
 
  useEffect(() => {
    
      try{
        async function getposts(){  
          await axios.get(`http://localhost:5000/api/posts/${id}/timeline`).then((res) => {
            setPosts(res.data);
          })
        }
        getposts();
      }catch(err){
        console.log(err);
      } 
     
    
  },[id]);
  
  if(!posts)
  return ( <div>loading...</div> )
  return (
    <div className='feed'>
      <div className='feed__header'>
        <div className='feed__header__title'>
          Feed
        </div>
      </div>
      <div className='feed__body'>
        {posts.map((post) =>
          <Post post = {post} key={post._id} />
        )}
      </div>
    </div>
  )
}

export default Feed