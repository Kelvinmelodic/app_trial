const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
    title:{
        type: String,
        maxLenth: [ 255, "Title is more than 255 character"],
        required: true
    },

    description: {
        type: String,
        required: true,
        maxLenth: [5000, "Description is more than 5000 characters"]
    },

    image: {
        type: String,
    
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
{ timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;