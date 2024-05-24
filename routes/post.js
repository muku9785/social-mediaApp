const express = require("express");
const router = express.Router();
const {createPost, likeAndUnlikePost,getPostOfollowing} = require("../controll/post")
const authMiddleware = require('../middleware/auth');

router.route('/post/upload', authMiddleware, createPost);
router.route('/post/:id', authMiddleware, likeAndUnlikePost);
router.route('/post', authMiddleware, getPostOfollowing);
module.exports = router;