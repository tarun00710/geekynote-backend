const { User } = require("../Model/userModel")


const userCheckHandler = async(req,res,next) => {
    try {
        const {email} = req.body
        const getUser = await User.findOne({email})
        if(getUser)
            next()
        else
            return res.status(401).json({success:false,message:"user authentication failed"})    
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {userCheckHandler}
