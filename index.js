'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()


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
  if(req.query['hub.verify_token']=="sagy"){
    res.send(req.query['hub.challenge'])
  }
  res.send('Wrong Token!')
})

app.listen(app.get('port'), function() {
  console.log("Running port")
})
