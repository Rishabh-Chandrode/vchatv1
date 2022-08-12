import React from 'react'
import './feed.css'
import Post from './post'
import axios from "axios";
import {useState , useEffect} from "react";

const Feed = ({parent,id}) => {
    
  const [isFetched, setIsFetched] = useState(false);
  const [posts, setPosts] = useState();
 
 
  useEffect(() => {
    
      if(!isFetched){
        try{
          async function getposts(){  
            await axios.get(`http://localhost:5000/api/posts/${id}/${parent}`).then((res) => {
              setPosts(res.data);
            })
          }
          getposts();
        }catch(err){
          console.log(err);
        }
      }
      setIsFetched(true); 
      
      
      
     
    
  });
  
  if(!posts)
  return <div>Loading...</div>
  return (
    <div className='feed'>
      <div className='feed__header'>
        <div className='feed__header__title'>
          Feed
        </div>
      </div>
      <div className='feed__body'>
        {posts.flatMap((post) =>
          <Post post = {post} key={post._id} />
        )}
      </div>
    </div>
  )
}

export default Feed