const mongoose= require("mongoose");
const schema= new mongoose.Schema({
  name:{
    type: String,
    required: [true, "Full Name is required"]
  },
  uniquesername:{
    type: String,
  },
  email:{
    type: String,
    unique: true
  },
  password:{
    type:String,
  }
})

//now creating a collection also called as table in RDBMS for the database
const Register= new mongoose.model("register", schema);
module.exports= Register;