import { Schema, model } from "mongoose";

const lectureSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        videoUrl: {
            type: String,
            required: true
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: "Course",
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default model("Lecture", lectureSchema);