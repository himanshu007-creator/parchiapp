require('dotenv').config()
const express = require('express')
const DBconnection = require('./db')
const Grid = require('gridfs-stream')
const mongoose = require('mongoose')
const upload = require('./routes/uploadRouter')
const AuthRouter = require('./routes/AuthRouter')

const jwt = require('jsonwebtoken')
const db = require('./db')
const app = express()

var bodyParser = require('body-parser')
const verifyToken = require('./middleware/verify')
const UserRouter = require('./routes/UserRouter')
 
 
// create application/json parser
var jsonParser = bodyParser.json()
  
app.use(jsonParser)
DBconnection()
const conn = mongoose.connection;
let gfs, gridfsBucket;
  conn.once('open', () => {
   gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
   bucketName: "fs"
 });
   gfs = Grid(conn.db, mongoose.mongo);
   gfs.collection("fs");
   return gfs;
})
const port = process.env.SERVER_PORT || 3000
app.listen(port, console.log("listening @",port))

app.use('/file', upload)

app.use('/user', UserRouter)

app.get('/view/:filename', async(req,res)=>{
    const token = req.query.q
    jwt.verify(token, process.env.JWT,  async(err, user) => {
      if (err) {
        res.status(404).json(err);
      }
       else {
    await gfs.files.findOne({ filename: req.params.filename}, (err,file)=>{
        if (!file || file.length === 0) {
            return res.status(400).json({
                err: err
            })
        }
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'image/jpg' || file.contentType === 'application.pdf') {
            const readStream = gridfsBucket.openDownloadStream(file._id);
            readStream.pipe(res);
        }
      })
    }
    })
});

/**
 * Auth Routes
 */
// for Authentication
app.use("/api/auth", AuthRouter)

// for file viewing
app.get('/remove/:filename', async(req,res)=>{
    const token = req.query.q
    jwt.verify(token, process.env.JWT,  async(err, user) => {
      if (err) {
        res.status(404).json(err);
      }
       else {
        try{
        const file = await gfs.files.deleteOne({filename: req.params.filename});
        res.status(204).json({result:"File deleted successfully"})
        }
        catch(err){
            res.send(err)
        }
    }
   })
})
app.get('/', (req, res) => {
    res.send('hello world')
})