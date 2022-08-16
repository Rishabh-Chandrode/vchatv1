import React from 'react'
import './feed.css'
import Post from './post'
import axios from "axios";
import {useState , useEffect} from "react";
import PostCreator from './postCreator';
import { useParams } from 'react-router';

const Feed = ({parent,Id}) => {
  const {id} = useParams();
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
  return <div class="loader"></div>
  return (
    <div className='feed'>
      {parent === "timeline" ?<PostCreator/> : null}
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