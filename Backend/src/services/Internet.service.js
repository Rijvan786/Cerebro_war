import {tavily as Tavily} from "@tavily/core"
import { Configure } from "../config/config.js"


const tavily=Tavily({
    apiKey:Configure.TAVILY_API_KEY
})



export async function SearchInternet({query}){
      const response =await tavily.search(query,{
        maxResults:5,
        searchDepth:"advanced"
      })

      console.log(`Search Internet tool ${JSON.stringify(response)}`);
      return JSON.stringify(response)
      
}