const axios = require('axios');

export function getGoogleSearch(query){
    const url = "https://www.googleapis.com/customsearch/v1?key="+process.env.google_api_key+"&cx=298981e708f101bfe&q="+query+"&num=10"
    return axios.get(url)
}