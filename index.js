const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const authRoutes = require('./routes/auth')
const postRoute = require('./routes/post')
var bodyParser = require('body-parser')
const server = require('http').createServer(app);
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

app.use(cors());
app.options('*', cors());
//env
require('dotenv').config()
const uri = process.env.ATLAS_URI;

//connecting mongo
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("database connect")
})

//middleware


//register
app.use('/api/user', authRoutes)
app.use('/api/post', postRoute)
app.use('/', (req, res) => {
    console.log(req.body.name)
    res.send(req.body.name)
})
app.use('/stream',(req,res)=>{
    console.log(req.body)
    
})
//created server
app.listen(8080, () => {
    console.log("Server loaded")
})

const io = require('socket.io')(server);
io.on('connection', () => {
    io.emit('request', /* … */); // emit an event to the socket
    io.emit('broadcast', /* … */); // emit an event to all connected sockets
    io.emit('reply', 'hekkio'); // listen to the event)
});