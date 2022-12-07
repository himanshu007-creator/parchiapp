const upload = require('../middleware/upload')
const express = require('express')
const mongoose = require('mongoose')
const Grid = require('gridfs-stream')
const Router = express.Router()
const ParchiUser = require('../models/user')
const verifyToken = require('../middleware/verify')
const jwt = require('jsonwebtoken')
var cors = require('cors')
Router.use(cors(corsOptionsDelegate))

var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
    corsOptions = { origin: true } // disable CORS for this request
  callback(null, corsOptions) // callback expects two parameters: error and options
}

const conn = mongoose.connection;
let gfs, gridfsBucket;
  conn.once('open', () => {
   gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
   bucketName: "fs"
 });
   gfs = Grid(conn.db, mongoose.mongo);
   gfs.collection("fs");
})

Router.post('/upload', [upload.single('file'), verifyToken], async(req,res)=>{
  const username =  req.user.username;
  const acr = username.slice(0,3)
  const userfound=  await ParchiUser.findOne({ username: username });
  const fileData={
    "doc":'',
    "accessHolders":[userfound._id]
  }
  const ReqProtocol = req.get('host').includes('localhost')? 'http':'https'
  var docs = await userfound.Documents;
  var valueArr = docs.map(function (item) {
    return item.doc;
  });  
    const fileNameEdited = req.file.originalname
    const finalName = `${acr}-parchi-secure-${fileNameEdited}`
    gfs.files.findOne({ filename: fileNameEdited}, async(err,file)=>{
        if(!file || file.length===0){
    if(req.file === undefined || req.file === null) return res.send("NO FILES FOUND")
    
    const fileUrl = `${ReqProtocol + '://' + req.get('host')}/view/${finalName}`
    var isThere = valueArr.some(function (i) {
      return i === fileUrl;
    });
    if(!isThere){
      fileData.doc = finalName
      const result =  await ParchiUser.updateOne(
          { username: username },
          { $addToSet: { Documents: fileData } }
        );
        return res.send({status:"success", data:{result}, url:fileUrl})
        }
    else{
      return res.send({status:"failure", data:"ALREADY EXIST"})

    }
  }
        })
    })

Router.get('/delete/:filename',verifyToken,async(req,res)=>{
  const token = req.query.q
  const username = req.user.username;
  console.log(">>> USERNAME: ",username)
  const userfound= await ParchiUser.findOne({ username: username})
  const newArr = userfound.Documents.filter(i=> i.doc!==req.params.filename)
  console.log(">>> ", newArr)
  jwt.verify(token, process.env.JWT,  async(err, user) => {
    if (err) {
      res.status(404).json(err);
    }
     else {
      try{
      const file = await gfs.files.deleteOne({filename: req.params.filename});
      var result = await ParchiUser.updateOne(
        { username: username },
        { $set: {"Documents": newArr}}
      );
      return res.json({result,file})
      }
      catch(err){
          return res.send(err)
      }
  }
 }
 )
})

module.exports = Router