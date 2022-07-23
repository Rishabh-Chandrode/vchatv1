import React from 'react'
import './feed.css'
import Post from './post'
import axios from "axios";
import {useState , useEffect} from "react";
const Feed = () => {

  const [posts, setPosts] = useState();
  const [isfetched,setIsFetched] = useState(false);
 
  useEffect(() => {
    if(!isfetched){
      try{
        async function getposts(){  
          await axios.get("api/posts/62dc5e8ed2d584eb74f85cc6/timeline").then((res) => {
            setPosts(res.data);
          })
        }
        getposts();
      }catch(err){
        console.log(err);
      } 
    }  
    setIsFetched(true);   
  },[]);
  if(posts)
  console.log(posts);
  if(posts)
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