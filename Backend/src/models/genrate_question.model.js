import mongoose from "mongoose";

const MCQQuestionSchema=new mongoose.Schema({
    questions:{
        type:string,
        required:true
    },
    options:{
        type:String,
        required:true,
    },
    correct_answer:{
        type:String,
        required:true
    },
    explanation:{
        type:String,
        required:true
    }
})


const MCQQuestionModel=mongoose.model("MCQQustions",MCQQuestionSchema)