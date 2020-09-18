import {getGoogleSearch} from './apihandler'

export async function google_search(content){
    try{
        content = content.toLowerCase()
        const results = await getGoogleSearch(content)
        console.log(JSON.stringify(results.data.items.length))
        const top_five_items = results.data.items.slice(0,5).map(i => i.link)
        const message = top_five_items.reduce((acc,link) => acc + link + "\n","")
        console.log(message)
        return message
    }catch(error){
        return "error occured"
    }
    
}

