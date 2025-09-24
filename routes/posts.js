const express = require("express");
const router = express.Router();
//import post controller
const { createPost, getPosts, updatePost} = require("../controllers/posts");
const upload = require("../utils/multer");
const { protect, authorize} = require("../middlewares/auth.js")

//routes to create  a new post
router.post("/", protect, upload.single("image"), createPost);
router.get("/", getPosts)
router.put("/:id", upload.single("image"), updatePost)

module.exports = router;