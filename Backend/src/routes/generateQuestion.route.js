import { Router } from "express"; 
import { PrimaryQuestionController } from "../controller/generateQuestion.controller.js";



const router=Router()


router.post("/PrimaryQuestions",PrimaryQuestionController)







export default router