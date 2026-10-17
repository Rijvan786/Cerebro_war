import express, { Request, Response } from "express";
import { Resend } from "resend";

const app = express();
const resend = new Resend("re_xxxxxxxxx");


export async function Sendmail({to,subject,html}){
    
}

app.get("/", async (req: Request, res: Response) => {
  

  if (error) {
    return res.status(400).json({ error });
  }

  res.status(200).json({ data });
});

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});