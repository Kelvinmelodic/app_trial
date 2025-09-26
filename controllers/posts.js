const Post = require("../models/Post")
const User = require("../models/User")
const path = require("path");


const createPost = async (req, res) => {
    try {
        const filePath = `/uploads/${req.file.filename}`;
        const absolutePath = path.join(__dirname, "..", "uploads",  req.file.filename);

        const post = await Post.create({
            title: req.body.title,
            description: req.body.description,
            image: filePath,
            author: req.user.id
        })

        const user = await User.findById(req.user.id)
        user.posts.unshift(post.id)
        await user.save()

        res.status(201).json({ message: "Post created", data: post})
    } catch (error) {
       res.status(500).json({message: "internal server error"})
       console.log(error) 
    }
};

const getPosts = async (req, res) => {
    const posts = await Post.find().populate('author'); 
    res.json({posts})
};

const updatePost = async ( req, res) => {
      try {
        const filePath = `/uploads/${req.file.filename}`;
        const absolutePath = path.join(__dirname, "..", "uploads",  req.file.filename);

        let post = await Post.findById(req.params.id)
        if(!post){
            return res.status(400).json({message: "post not found"})
        }

        post = await Post.findByIdAndUpdate(
            req.params.id,
            {
              $set: {
                title: req.body.title,
                description: req.body.description,
                image: filePath
              }  
            },
            { new: true}
        );

        res.json({post})
      } catch (error) {
        res.status(500).json({message: "Something went wrong", error})
        console.log(error)
        
      }
}
     

exports.createPost = createPost;
exports.getPosts = getPosts;
exports.updatePost = updatePost;