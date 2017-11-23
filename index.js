'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

let token = "EAAdHY46Eaq0BAIWQekFlZCfd32p041DieEsRWIOZBZCIck4KtZALbd1bahHD4rDGu4H6QVvwMrP1J5Mgvuf05LRzREYoWZBrAsgNqZC8cTUqzFaFqlkQZBRxKpkh3YA3hsUNaKzQtJ5UByksg9Gq6ZAUzHgVLIFVUhbfuQXnBXJQRgZDZD"
app.set('port', (process.env.PORT || 5000))

//To process the data
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//routes
app.get('/', function(req, res){
  res.send("Hi I am a chatbot")
})

//FB
app.get('/webhook/',function(req, res){
  if(req.query['hub.verify_token'] === "sagy"){
    res.send(req.query['hub.challenge'])
  }
  res.send("Wrong Token!")
})

app.post('/webhook/', function(req,res){
  let messaging_events = req.body.entry[0].messaging
  for(let i=0; i<messaging_events.length; i++){
    let event = messaging_events[i]
    let sender = event.sender.id
    let name = event.sender.name
    if(event.message && event.message.text){
      let text = event.message.text
      console.log("text:"+text)
      console.log("Text echo: "+text.substring(0,100))
      sendText(sender, "Thanks "+name+", for your message. We'll take care to your request soon.")
    }
  }
  res.sendStatus(200)
})

function sendText(sender, text){
  let messageData = {text:  text}
  request({
    url: "https://graph.facebook.com/v2.6/me/messages",
    qs: {access_token: token},
    method: "POST",
    json: {
      recipient: {id: sender},
      message: messageData,
    }
  }, function(error, response, body){
    if(error){
      console.log("sending error!")
    } else if(response.body.error){
      console.log("response body error")
    }

  })
}

app.listen(app.get('port'), function() {
  console.log("Running port")
})
