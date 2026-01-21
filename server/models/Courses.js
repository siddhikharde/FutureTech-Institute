import mongoose from "mongoose";
import {model, Schema} from 'mongoose';
const courseSchema=new Schema({
    title:String,
    description:String,
    price:Number,
},
{
    timestamps:true
})

const Course=model("Course", courseSchema);
export default Course;