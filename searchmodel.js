const mongoose = require('mongoose')
const search = new mongoose.Schema(
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
search.index({history: 'text'});
const Model = mongoose.model("searches", search);
class Search{
    constructor(){
        
    }

    insertSearch(data){
        const p1 = new Model(data)
        return p1.save()
    }
    findAll(search){
       return Model.find({$or: [ {$text: { $search: search.query }}],user: search.user}).sort('-timestamp')
    }
}
export{Search}

