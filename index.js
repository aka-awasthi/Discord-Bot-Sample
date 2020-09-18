require('dotenv').config();
import {Search} from './searchmodel'
import {Db} from './db'
import {google_search} from './search'
const Discord = require('discord.js');
const client = new Discord.Client();

const TOKEN = process.env.TOKEN;

function createErrorResponse(msg){
    msg.channel.send("db connection error")
}

const db = new Db()
db.dbConnectAndExecute(createErrorResponse)

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  const message = msg.content.toLowerCase()  
  if (message === 'hi') {
    msg.channel.send('hey');
  }else if (message.startsWith('!google')){
    const query = msg.content.replace('!google','').trim()
    const row = {timestamp: Date.now(),user: client.user.tag,engine: "google",history: query}
    const sm = new Search()
    sm.insertSearch(row).then(p => console.log(p)).catch(err => console.log(err))
    google_search(query).then(data => {
        msg.channel.send(data)
    }).catch(error => [
        msg.channel.send('google search error occured')
    ])
  }else if(message.startsWith('!recent')){
    const query = message.replace('!recent','').trim()
    const sm = new Search()
    sm.findAll({query: query,user: client.user.tag}).then(data => {
        data = data.reduce((acc,history) => acc + history.history+"\n","")
        msg.channel.send(data)
    }).catch(error => {
        msg.channel.send("error in search")
    })
  }
});

client.login(TOKEN);