const mongoose = require('mongoose');

const ConnectionDB = async(req,res) => {
    try {
        const checkConnection = await mongoose.connect('mongodb+srv://tarun0710:Tkat%406750@clusternote.g3twn.mongodb.net/test')
        if(checkConnection)
            console.log("connected to DB")
    } catch (error) {
        console.log(error)
    } 
}
module.exports = {ConnectionDB}