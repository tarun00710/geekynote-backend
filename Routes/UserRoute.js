const express = require('express')
const { User } = require('../Model/userModel')
const bcrypt = require('bcryptjs')
const { userCheckHandler } = require('../Middleware/userCheckHandler')
const router = express.Router()


router.route('/signup').post(async(req,res) => {
    try {
        const {name,email,password,confirmpassword} = req.body
        if(password === confirmpassword){
            const createUser = new User({
                name:name,
                email:email,
                password:password
            })
            const user = await createUser.save()
            if(user)
                res.json({success:true,user})
        }
    } catch (error) {
        console.log(error)
    }
   
})

router.route('/login').post(userCheckHandler,async(req,res) => {
    try {
        const {email,password} = req.body
            const getUser = await User.findOne({email})
            const verifyUserPassword = await bcrypt.compare(password,getUser.password)
            if(verifyUserPassword)
                return res.status(200).json({success:true,getUser})
            return res.status(401).json({success:false,message:"User authentication failed"})
    } catch (error) {
        console.log(error)
    }
   
})

module.exports = router
