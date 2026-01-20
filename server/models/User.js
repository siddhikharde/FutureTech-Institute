import {model, Schema} from 'mongoose'
const userSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["admin", "student"],
        default:"student",
    },
    fee:{
        total:Number,
        paid:{
            type:Number,
            default:0
        }
    },
       enrolledCourses:[
        {
            type:Schema.Types.ObjectId, ref:"Course"
        }
    ]
},{
    timestamps:true
})

const User=model("User", userSchema);
export default User;