import {getGoogleSearch} from './apihandler'

export async function google_search(content){
    try{
        content = content.toLowerCase()
        const results = await getGoogleSearch(content) // calling the google search api
        const top_five_items = results.data.items.slice(0,5).map(i => i.link) //taking top 5 results from google search
        const message = top_five_items.reduce((acc,link) => acc + link + "\n","")
        return message
    }catch(error){
        return "error occured"
    }
    
}

