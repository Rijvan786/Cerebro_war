import { getResponse } from "../services/ai.service.js"

export async function PrimaryQuestionController(req,res){
        const {class_level,course,subject} =req.body

        const response=await getResponse({messages:class_level,course,subject})
        console.log(response);

        res.status(200).json({
                response
        })
}