const mongoose = require('mongoose')
const uri = ""

class Db {
    constructor(){
    }
    dbConnectAndExecute(fn) {
        mongoose.connection.on('error',err => {
            console.log(err)
            fn()
        })
        return mongoose.connect(uri,{ useUnifiedTopology: true, useNewUrlParser: true })
    }
    closeConnection(){
        mongoose.connection.close()
    }
}
export{Db}