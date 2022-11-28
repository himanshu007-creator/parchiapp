const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true, dropDups: true },
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
            index: {unique: true, dropDups: true},
            required: true,
            unique: true,
        },
        accessHolders:{
            type: [String], 
            default: []
        }
    },
  ], 
  PatientDocs:{
    type:[String],
    default:[]
  }
});

const ParchiUser = mongoose.model("ParchiUser", schema);

module.exports = ParchiUser;