const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

// const auth = async (req,res,next) =>{
//     const token = req.header("auth-token")
//     if (!token) {
//         res.json("Unauthorized access")
//     }else{
//         try{
//             const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
//             const user = await User.findById(decoded.id).select("-password")
//             req.user = user
//             next()
//         }catch(error){
//             console.log(error);
//         }
//     }

    
// }

const auth = async (req, res, next) => {
    const token = req.header("auth-token");

    // Check if token is present
    if (!token) {
        return res.status(401).json({ error: "Unauthorized access" });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Find user based on decoded token
        const user = await User.findById(decoded._id || decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        // Attach user to request object and proceed
        req.user = user;
        next();

    } catch (error) {
        console.error("JWT Error:", error.message);
        return res.status(400).json({ error: "Invalid or malformed token." });
    }
};

module.exports = auth;


const admin = async(req,res,next)=>{
    if (req.user.role !== "admin") {
        res.json("Access Denied")
    }else{
        next()
    }

    
}

module.exports = {auth, admin}