const router = require("express").Router();
const Post = require("../models/Post.js");
const User = require("../models/User.js");




//create a post
router.post("/", async (req,res) => {
  const {desc, img, userId, username} = req.body;
  //const img = JSON.stringify(baseImage);
  //console.log(img);
  const post = new Post({
    desc: desc,
    img: img,
    userId: userId,
    username: username
  });
  try{
    await post.save();
    res.status(200).send(post);
  }catch(err){
    res.status(400).send(err);
  }
})
    

  
//update post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
        await post.updateOne({$set:req.body});
        res.status(200).json("the post has been updated")
    } else {
      res.status(403).json("you cant update this post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete post
router.delete("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.userId === req.body.userId) {
          await post.deleteOne();
          res.status(200).json("the post has been deleted")
      } else {
        res.status(403).json("you cant delete this post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
});

// like/dislike a post
router.put("/:id/like",async (req,res) =>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}});
            res.status(200).json("The post has been liked")
        }else{
            await post.updateOne({$pull:{likes:req.body.userId}});
            res.status(200).json("The post has been disliked");
        }
    }catch(err){
      res.status.apply(500).json(err)
    }

});

//get a post
router.get("/:id",async (req,res) => {
    try{
      const post = await Post.findById(req.params.id);
      res.status(200).json(post)
    }catch(err){
      res.status(500).json(err);
    }
});


//get timeline

router.get("/:id/timeline",async (req,res) => {
    let postArray ;
    try{
      const currentUser = await User.findById(req.params.id);
      const userPosts = await Post.find({userId: currentUser._id});
      const friendPosts = await Promise.all(
        currentUser.followings.map((friendId)=>{
            return Post.find({userId: friendId});
        })
      );
      postArray = userPosts.concat(friendPosts);
      postArray.sort( (a,b) => { 
        return b.createdAt - a.createdAt;
      
       } )

       
       postArray = postArray.flat(1);
      
      res.json(postArray);
    }catch(err){
      res.status(500).json(err);
    }
})

// get all posts of user

router.get("/:id/allposts", async (req,res) => {
  const posts = await Post.find({userId: req.params.id});
  posts.sort( (a,b) => { 
    return b.createdAt - a.createdAt;
  
   } )
  res.status(200).json(posts);
})

module.exports = router;
