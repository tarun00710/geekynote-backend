const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require('bcryptjs')

const CheckBoxSchema = new Schema({
  isChecked: {
    type: Boolean,
    // required:true
  },
  checkContent: { type: String },
});

const NotesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: [String, [CheckBoxSchema]],
  },
});

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  notes: [NotesSchema],
});

UserSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12)
    }
    next()
})


const User = model('User',UserSchema)

module.exports =  {User}