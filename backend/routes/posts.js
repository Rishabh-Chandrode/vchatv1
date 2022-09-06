const router = require("express").Router();

const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');

const Post = require("../models/Post.js");
const User = require("../models/User.js");



const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'images');
  },
  filename: function(req, file, cb) {   
      cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if(allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(null, false);
  }
}

let upload = multer({ storage, fileFilter });



//create a post
router.post("/",upload.single('img') , async (req,res) => {
  const name = req.body.name;
  const desc = req.body.desc;
  const img = req.file.filename;

  const newpost = new Post({
    username:name,
    desc,
    img,
    userId:req.body.userId,
    ProfilePicture:req.body.ProfilePicture
  })
  newpost.save()
  .then( () => res.json('post added'))
  .catch( err => res.status(400).json('Error :' +err));

  
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
      
       
       postArray = postArray.flat(1);
       postArray.sort( (a,b) => { 
        return b.createdAt - a.createdAt;
      
       } )

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
