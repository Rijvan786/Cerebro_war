import { body,validationResult } from "express-validator";

async function validate(req,res,next){
    
     const errors=await validationResult(req)
     if(!errors.isEmpty()){
        return res.status(400).json({
            message:errors.array()
        })
     }
     next()
}

export const RegisterValidator=[
    body("InstituteName").notEmpty().withMessage("Institute Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
   body("password")
  .matches(/^(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/)
  .withMessage("Password must be at least 8 characters and include one special character and one number"),
    body("contact").isNumeric().withMessage("Contact must be 10 digit number"),
    body("role").matches(/^(primary|middle|secondary|higher_secondary|collage)$/).withMessage("Role must be one of primary, middle, secondary, higher_secondary, Collage"),
    validate
]