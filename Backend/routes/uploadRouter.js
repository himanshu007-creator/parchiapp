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

Router.post('/upload', [upload.single('file'), verifyToken], (req,res)=>{
    console.log(req.user)
    const fileNameEdited = req.file.filename.replace(' ','-')
    gfs.files.findOne({ filename: fileNameEdited}, (err,file)=>{
        if(!file || file.length===0){
    if(req.file === undefined || req.file === null) return res.send("NO FILES FOUND")
    console.log("FILE: ", file)
    const fileUrl = `${req.protocol + '://' + req.get('host')}/view/${fileNameEdited.replace(' ','-')}`
    return res.send(fileUrl)
        }
    })
});



module.exports = Router