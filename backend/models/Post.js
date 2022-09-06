const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
   userId:{
    type:String,
    required:true
   },
   username:{
    type:String,
   },
   desc:{
    type:String,
    max:500
   },
   ProfilePicture:{
    type:String,
    default:""
   },
   img:{
    type:String
   },
   likes:{
    type:Array,
    default:[]
   }
},
{
    timestamps:true
}
);


module.exports = mongoose.model("Post",PostSchema);