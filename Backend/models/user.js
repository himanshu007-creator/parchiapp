const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    // index: { unique: true, dropDups: true },
    unique: true,
    dropDups: true 
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Doctor", "Patient"], 
    required: true
},
  Documents: [
    {
        doc:{
            type: String, 
            required: true, 
            unique: true,
            dropDups: true 
        },
        accessHolders:{
            type: [String], 
            default: []
        }
    },
  ]
});

const ParchiUser = mongoose.model("ParchiUser", schema);

module.exports = ParchiUser;