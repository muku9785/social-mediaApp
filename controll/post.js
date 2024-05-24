const Post = require("../models/post");
const User = require("../models/user");

exports.createPost = async (req, res) => {
    try {
        console.log("Request user:", req.user); // Debugging log
        const newPost = {
            caption: req.body.caption,
            image: {
                public_id: req.body.public_id,
                url: req.body.url
            },
            owner: req.user._id
        };

        const post = await Post.create(newPost);
        const user = await User.findById(req.user._id);

        user.posts.push(post._id);
        await user.save();

        res.status(200).json({
            success: true,
            post: post
        });

    } catch (error) {
        console.error("Error creating post:", error); // Debugging log
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.likeAndUnlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        if (post.likes.includes(req.user._id)) {
            const index = post.likes.indexOf(req.user._id);
            post.likes.splice(index, 1);
            await post.save();
            res.status(200).json({
                message: "Post unliked",
                success: true
            });
        } else {
            post.likes.push(req.user._id);
            await post.save();
            res.status(200).json({
                success: true,
                message: "Post liked"
            });
        }
    } catch (error) {
        console.error("Error liking/unliking post:", error); // Debugging log
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
};
exports.getPostOfollowing = async (req, res) => {
    try {
        const user = await user.findById(req.user._id).populate('following','posts');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "user  found",
            user,
        });

        
    } catch (error) {
        console.error("Error liking/unliking post:", error); // Debugging log
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
};
