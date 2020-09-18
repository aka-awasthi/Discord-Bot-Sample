const mongoose = require('mongoose')
const uri = "" // please put your own mongodb connection string

// Db class is used to start the connection with mongodb server 

class Db {
    constructor(){
    }
    dbConnectAndExecute(fn) {
        mongoose.connection.on('error',err => {
            console.log(err)
            fn()
        })

        // return connect promise 
        return mongoose.connect(uri,{ useUnifiedTopology: true, useNewUrlParser: true })
    }
    closeConnection(){
        mongoose.connection.close()
    }
}
export{Db}
