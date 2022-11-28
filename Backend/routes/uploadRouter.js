const upload = require('../middleware/upload')
const express = require('express')
const mongoose = require('mongoose')
const Grid = require('gridfs-stream')
const Router = express.Router()
const ParchiUser = require('../models/user')
const verifyToken = require('../middleware/verify')


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
  const userfound=  await ParchiUser.findOne({ username: username });
  const fileData={
    "doc":'',
    "accessHolders":[userfound._id]
  }
  var docs = await userfound.Documents;
  var valueArr = docs.map(function (item) {
    return item.doc;
  });  
    const fileNameEdited = req.file.originalname
    gfs.files.findOne({ filename: fileNameEdited}, async(err,file)=>{
        if(!file || file.length===0){
    if(req.file === undefined || req.file === null) return res.send("NO FILES FOUND")
    
    const fileUrl = `${req.protocol + '://' + req.get('host')}/view/parchi-secure-${fileNameEdited}`
    var isThere = valueArr.some(function (i) {
      return i === fileUrl;
    });
    if(!isThere){
      fileData.doc = fileUrl
      const result =  await ParchiUser.updateOne(
          { username: username },
          { $addToSet: { Documents: fileData } }
        );
        return res.send({status:"success", data:result})
        }
    else{
      return res.send({status:"failure", data:"ALREADY EXIST"})

    }
  }
        })
    })

module.exports = Router