import axios from "axios";

const createPost = async (postDesc, baseImage, userId) => {
    try{
        
        const currentUserName = localStorage.getItem("userName");
        //console.log(baseImage);
        const response = await axios({
            method: "post",
            url: "http://localhost:5000/api/posts",
            headers: {
              "Content-Type": "application/json",
            },
            data: {desc:postDesc, img:baseImage, userId:userId, username:currentUserName},
          })
          console.log(response);
          return response;
    }catch(err){
        return err.response;
    }
}

const postService = { createPost };

export default postService;