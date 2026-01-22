import mongoose from "mongoose";
import {model, Schema} from 'mongoose';
const courseSchema=new Schema({
    title:{
        type:String,
        required:true,
         index:true
        },
    description:String,
    price:Number,
    duration:{
        type:String}
},
{
    timestamps:true
})

const Course=model("Course", courseSchema);
export default Course;