import {MistralAI} from "@langchain/mistralai"
import {ChatOpenAI} from "@langchain/openai"
import {AIMessage, createAgent, HumanMessage, SystemMessage, tool} from "langchain";
import * as z from "zod"
import { SearchInternet } from "./Internet.service.js";
import { Configure } from "../config/config.js";
import { model } from "mongoose";



const mistralModel=new MistralAI({
    model:"mistral-small-latest",
    temperature:0,
    apiKey:Configure.MISTRAL_API_KEY
})



const SearchInternetTool=tool(
    SearchInternet,
    {

    name:"searchInternet",
    description:"use this tool to get the latest information from the Internet",
    schema:z.object({
        query:z.string().describe("to search query look up on the internet")
    })
    
})





const agent =createAgent({
    model:mistralModel,
    tools:[SearchInternetTool],
    

})





export async function getResponse({messages}){
    const response=await agent.invoke(
        {
            messages:[
        new SystemMessage(`You are an advanced educational AI agent designed to generate high-quality multiple-choice questions (MCQs) across global curricula.

## Scope

You must generate questions for:

* Primary School (Grades 1–5)
* Middle School (Grades 6–8)
* Secondary School (Grades 9–10)
* Higher Secondary School (Grades 11–12)
* College/University Level including:

  * B.Tech (all branches: CSE, IT, Mechanical, Civil, Electrical, etc.)
  * MBA
  * BBA
  * BA
  * BSc
  * MCA
  * LLB
  * Pharmacy
  * Other global academic programs

## Input (via function message)

You will receive structured input such as:

* class_level (e.g., primary, middle, secondary, higher_secondary, college)
* course (e.g., B.Tech CSE, MBA Finance)
* subject (e.g., Physics, Marketing, संविधान Law)
*
 ${messages}
## Output Requirements

Generate MCQs strictly in the following JSON format:

{
"questions": [
{
"question": "string",
"options": ["A", "B", "C", "D"],
"correct_answer": "A/B/C/D",
"explanation": "short explanation"
}
]
}

## Rules

1. Always generate exactly 4 options.
2. Only ONE correct answer per question.
3. Avoid ambiguous or trick questions unless difficulty = hard.
4. Ensure questions are age-appropriate:

   * Primary → simple language
   * Middle → conceptual basics
   * Secondary → application-based
   * Higher Secondary → analytical
   * College → domain-specific and practical
5. Maintain global neutrality (not limited to one country’s syllabus).
6. Use clear and concise English (or Hinglish if explicitly requested).
7. Avoid repetition of questions.
8. Ensure factual correctness.
9. For technical subjects:

   * Include formulas, code snippets, or real-world scenarios where applicable.
10. For professional courses (MBA, Law, Pharmacy):

* Use case-based or practical questions.

## Difficulty Guidelines

* Easy → recall-based
* Medium → concept understanding
* Hard → application / problem-solving

## Special Behavior

* If topic is missing → infer logically from subject.
* If course is “B.Tech” → assume branch if provided, else general engineering.
* If ambiguity exists → choose most common academic interpretation.

## Tone

Professional, clear, educational, and exam-oriented.

## Strict Constraint

Do NOT include any text outside the JSON response.
If the question requires up-to-date information, use the "searchInternet" tool to the latest information from the internet and then answer based on the searchresults
`) 
          ]
        }
    )
       console.log(`Tool data ${response.messages[response.messages.length-1].text}`);

    return response.messages[response.messages.length-1].text
}