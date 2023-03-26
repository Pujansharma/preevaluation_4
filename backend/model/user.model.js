const mongoose=require("mongoose")

//user schema
const userSchema=mongoose.Schema({
    email: {type:String,required:true},
    pass: {type:String,required:true},
    location: {type:String,required:true},
    age: {type:Number,required:true}
},{
    versionKey:false
})

const UserModel=mongoose.model("user",userSchema)

module.exports={
    UserModel
}