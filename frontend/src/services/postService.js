import axios from "axios";

const createPost = async (postContent) => {
    try{
        const currentUserId = localStorage.getItem("userId");
        const response = await axios({
            method: "post",
            url: "http://localhost:5000/api/posts",
            headers: {
              "Content-Type": "application/json",
            },
            data: {desc:postContent, userId:currentUserId},
          })
          console.log(response);
          return response;
    }catch(err){
        return err.JSON(err.response.data);
    }
}

const postService = { createPost };

export default postService;