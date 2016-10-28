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

router.get('/books/:id', function(req, res){
  // req.body.id >>> /data + { id: 0 }
  // req.params.id >>> /data
  // req.query >>> /data?q={id}
  // req.param('id') >>>
  let book = books.filter(function(book){
    return book.id === Number(req.params.id)
  })[0] // [0] di belakang fungsinya untuk mengembalikan data bukan array

  if(!book) res.status(404).json({ 'msg': "book no found" })

  res.send(book)
})

// deleted
router.delete('/books/:id', function(req, res){
  const book = books.filter(function(book){
    return book.id === Number(req.params.id)
  })[0]

  // send 404 Error massage
  if(!book) res.status(404).json({ 'msg': "book no found" })

  // deleted the book from array
  books.splice(books.indexOf(book), 1)

  // response
  res.json({ 'message': `Book ${id} has been deleted` })
})

// put method
router.put('/books/:id', function(req, res){
// nanti copy dari repo git hidar
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
