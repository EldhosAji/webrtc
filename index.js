const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Files = require('./db/files');
const cors = require('cors')
const authRoutes = require('./routes/auth')
const postRoute = require('./routes/post')
var bodyParser = require('body-parser')
const server = require('http').createServer(app);
const io = require('socket.io')(server);
let { PythonShell } = require('python-shell')
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

app.use(cors());
app.options('*', cors());
//env
require('dotenv').config()
const uri = process.env.ATLAS_URI;

//connecting mongo
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true,useFindAndModify: false })
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("database connect")
})

//middleware
console.log("its working")

app.use('/api/compile', async(req, res) => {
    console.log("hellow");
    let code = req.body.code;
    console.log("t1")
    console.log(req.body.id)
    console.log(code)
    console.log("t2");
    const upload= await Files.findByIdAndUpdate({_id:req.body.id}, {$set:{code:code}},{new:true}, function(err, result) {
        console.log(result)
    if (err)
        res.send({'log':(String(err))})
    });
    console.log(upload)
    try{
    await PythonShell.runString(code, null, (err, results)=>{
        try{
            if (err) {
                res.send({'log':(String(err))})
            }
            console.log(String(results))
            res.send({'log':String(results)})
        }catch(e){
            res.send({'log':'-!Syntax error'})
        }
    });
    }catch(err){
        res.send({'log':JSON.stringify(err)})
    }
})



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
