const mongoose = require('mongoose')
const search = new mongoose.Schema( // this is the collection schema named searches. properties are engine, user,history,timestamp
    {
      engine: {
        type: String
      },
      user: {
        type: String
      },
      history: {
        type: String
      },
      timestamp: {
          type: Number
      }
    },
    { collection: "searches" }
);
search.index({history: 'text'}); // enable index search for history field
const Model = mongoose.model("searches", search);
class Search{
    constructor(){
        
    }

    insertSearch(data){  // insert document in searches collection
        const p1 = new Model(data)
        return p1.save()
    }
    findAll(search){  // index search function matching with user tag and sorting in desc order
       return Model.find({$or: [ {$text: { $search: search.query }}],user: search.user}).sort('-timestamp')
    }
}
export{Search}

