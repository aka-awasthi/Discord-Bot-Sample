const axios = require('axios');

// google api url for search on google engine . please provide api key through .env file
export function getGoogleSearch(query){
    const url = "https://www.googleapis.com/customsearch/v1?key="+process.env.google_api_key+"&cx=298981e708f101bfe&q="+query+"&num=10"
    return axios.get(url)
}
