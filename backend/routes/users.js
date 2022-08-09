const router = require("express").Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");


//update user
router.put("/:id",async (req,res) => {
    if(req.body.userId == req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }catch(err){
                console.log(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            })
            res.status(200).json("Account has been updated")
        }catch(err){
            console.log(err);
        }
    }else{
        return res.status(403).json("you can only update your account")
    }
});

//delete user

router.delete("/:id",async (req,res) => {
    if(req.body.userId == req.params.id || req.body.isAdmin){
        
        try{
            const user = await User.deleteOne({ _id: req.params.id })
            res.status(200).json("Account has been deleted")
        }catch(err){
            console.log(err);
        }
    }else{
        return res.status(403).json("you can only delete your account")
    }
});

//get a user

router.get("/:id" ,async (req,res) => {
    try{
        const user = await User.findById(req.params.id);
        const {password,updatedAt, ... other} = user._doc;
        res.status(200).json(other);
    }catch(err){
        console.log(err);
    }
})

//get all users 
router.get("/get/allusers" ,async (req,res) => {
    try{
        const users = await User.find({});
        res.status(200).json(users);
    }catch(err){
        console.log(err);
    }
})

//get all followers 
router.get("/:id/followers",async (req,res) => {
    try{
        const user = await User.findById(req.params.id);
        const followers = user.followers;
        //console.log(user);
        const users = await User.find({_id: {$in: followers}});
        res.status(200).json(users);
        //res.status(200).json(followings);
    }catch(err){
        console.log(err);
    }
})
//get all followings 
router.get("/:id/followings",async (req,res) => {
    try{
        const currentUser = await User.findById(req.params.id);
        const followings = currentUser.followings;
        const users = await User.find({_id: {$in: followings}});
        res.status(200).json(users);
    }catch(err){
        console.log(err);
    }
})

//user recommendation for a user
router.get("/:id/explore", async (req,res) => {
    try{
        const currentUser = await User.findById(req.params.id);
        const currentUserFollowings = currentUser.followings;
        
        const users = await User.find({ _id:  {$nin: currentUserFollowings } });
        
        res.status(200).json(users);
    }catch(err){
        console.log(err);
    }
})


//follow a user
router.put("/:id/follow",async (req,res) =>{
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push : {followers : req.body.userId}});
                await currentUser.updateOne({$push : {followings : req.params.id}});
                res.status(200).json("user has been followed ")
            }else{
                res.status(403).json("you already follow the user");
            }
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("you cant follow yourself");
    }
});

//unfollow a user

router.put("/:id/unfollow",async (req,res) =>{
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull : {followers : req.body.userId}});
                await currentUser.updateOne({$pull : {followings : req.params.id}});
                res.status(200).json("user has been unfollowed ")
            }else{
                res.status(403).json("you dont follow the user");
            }
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("you cant unfollow yourself");
    }
});

module.exports = router;