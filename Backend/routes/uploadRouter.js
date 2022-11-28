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
    const fileNameEdited = req.file.originalname
    // const  fileExtension = req.params.filename.substring(req.params.filename.lastIndexOf("."));
    gfs.files.findOne({ filename: fileNameEdited}, (err,file)=>{
        if(!file || file.length===0){
    if(req.file === undefined || req.file === null) return res.send("NO FILES FOUND")
    const fileUrl = `${req.protocol + '://' + req.get('host')}/view/parchi-secure-${fileNameEdited}`
    return res.send(fileUrl)
        }
    })
});



module.exports = Router