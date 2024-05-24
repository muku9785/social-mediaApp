const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "already exists" });
        }

        user = await User.create({
            name,
            email,
            password,
            avatar: { public_id: "sample._id", url: "sampleurl" }
        });

        res.status(201).json({ success: true, user: { name: user.name, email: user.email, avatar: user.avatar } });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({ success: false, message: "not exist" });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Incorrect password" });
        }

        const token = user.generateToken();

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000
        });

        res.status(200).json({ success: true, user: { email: user.email, password: user.password } });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};


// exports.followUser = async (req, res) => {
//     try {

//         const userToFollow = await User.findById(req.params.id)
//         const loggedInUser = await User.findById(req.params.id)
//         if (!userToFollow) {
//             return res.status(400).json({ success: false, message: "User does not exist" });
//         }
//         loggedInUser = following.push(userToFollow._id)
//         userToFollow = followers.push(loggedInUser._id)
//         await loggedInUser.save();
//         await userToFollow.save();
//         res.status(200).json({ success: true,message: "User has beenfollowed successfully"});
//     } catch (error) {
//         console.error('Error logging in:', error);
//         res.status(500).json({ success: false, message: "Server error" });
//     }
// };
