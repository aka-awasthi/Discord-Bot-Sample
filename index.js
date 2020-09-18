require('dotenv').config();
import {Search} from './searchmodel'
import {Db} from './db'
import {google_search} from './search'
const Discord = require('discord.js');
const client = new Discord.Client();

const TOKEN = process.env.TOKEN; // get the discord bot token

function createErrorResponse(msg){
    msg.channel.send("db connection error")
}

const db = new Db()
db.dbConnectAndExecute(createErrorResponse)

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);  // when successfully logged in
});

client.on('message', msg => {
  const channelId = JSON.parse(JSON.stringify(msg)).channelID
  const message = msg.content.toLowerCase()  
  if (message === 'hi') {  // if hi is sent bot will send hey
    msg.channel.send('hey');
  }else if (message.startsWith('!google')){  // if message starts with !google 
    const query = msg.content.replace('!google','').trim()
    const row = {timestamp: Date.now(),user: channelId,engine: "google",history: query} // then make the search model
    const sm = new Search()
    sm.insertSearch(row).then(p => console.log(p)).catch(err => console.log(err)) // try to insert into db
    google_search(query).then(data => { // call the goole search api
        msg.channel.send(data) // send the results back to bot given by google api
    }).catch(error => [
        msg.channel.send('google search error occured')
    ])
  }else if(message.startsWith('!recent')){ // if message start with !recent 
    const query = message.replace('!recent','').trim()
    const sm = new Search()
    sm.findAll({query: query,user: channelId}).then(data => { // will try to find query in index search of collection for history field
        data = data.reduce((acc,history) => acc + history.history+"\n","")
        if (data){
            msg.channel.send(data) // then send the data return by it
        }else{
            msg.channel.send('searched item not found in DB')
        }
    }).catch(error => {
        msg.channel.send("error in search")
    })
  }
});

client.login(TOKEN); // try to login 
