'use strict'

// node modules

// express dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// initial express
const app = express()
const router = express.Router()

// app configuration

// req.body
app.use(bodyParser.urlencoded({extended: true})) // fungsinya untuk bisa ambil data dari form
app.use(bodyParser.json())
app.use(cors())

const books = require('./data.js')

// routing
console.log(books);

router.get('/ping', function(req, res){
  res.send('PONG!')
})

router.get('/books', function(req, res){
  res.send(books)
})

// register router
app. use('/', router)


// run the app
const hostname = process.env.HOST || "localhost"
const port = process.env.PORT || "3000" // client 5000 - 8000

app.listen(port, hostname, function(err){
  if(err) console.log(err);
  console.log(`server is running ${hostname}:${port}`);
})
