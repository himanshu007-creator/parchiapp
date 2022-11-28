const jwt = require('jsonwebtoken')
const ParchiUser = require('../models/user')

async function getFiles(req, res) {
  const username = req.user.username;
  const userfound= await ParchiUser.findOne({ username: username });
  var docs = userfound.Documents;
  if (req.query.sort == "asc") {
    docs.sort((a, b) => {
      let fa = a.shortlink.toLowerCase();
      let fb = b.shortlink.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  } else if (req.query.sort == "dsc") {
    docs.sort((a, b) => {
      let fa = a.shortlink.toLowerCase();
      let fb = b.shortlink.toLowerCase();

      if (fa < fb) {
        return 1;
      }
      if (fa > fb) {
        return -1;
      }
      return 0;
    });
  } else if (req.query.sortdate == "dsc") {
    docs.sort((a, b) => {
      let fa = Date.parse(a.created_at);
      let fb = Date.parse(b.created_at);

      if (fa < fb) {
        return 1;
      }
      if (fa > fb) {
        return -1;
      }
      return 0;
    });
  } else if (req.query.sortdate == "asc") {
    docs.sort((a, b) => {
      let fa = Date.parse(a.created_at);
      let fb = Date.parse(b.created_at);

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  }
  res.status(200).json(docs);
}

async function getDoctors(req, res) {
  const doctors= await ParchiUser.find({ role: "Doctor" });
  const SafeData = []
  doctors.map((i)=>{
    SafeData.push({username:i.username, id:i._id})
  })
  res.status(200).json(SafeData);
}

async function addDocAccessToFile(req, res) {
  const rm = req.params.short;
  const username = req.user.username;
  const userfound= await ParchiUser.findOne({ username: username});
  const DoctorFound= await ParchiUser.findOne({ _id: req.body.doctor});
  console.log("DOC>> ", DoctorFound)

  const docs = userfound.Documents;
  let found = false;
  var ans
  docs.forEach(element => {
    if (element.doc=== req.body.doc) {
      found = true;
      ans = element;
    }
  })
  var newArr;
  var DocArray;
  if(req.body.action === 'add'){
  const arr = new Set([req.body.doctor].concat(ans.accessHolders))
  const darr = new Set([req.body.doc].concat(DoctorFound.PatientDocs))
  newArr = Array.from(arr)
  DocArray = Array.from(darr)
  }
  if(req.body.action === 'delete'){
    newArr = ans.accessHolders.filter(i=> i!=req.body.doctor)
    DocArray = DoctorFound.PatientDocs.filter(i=> i!=req.body.doc)
  }
  if (found) {
    var result = await ParchiUser.update(
      { username: username, "Documents.doc": req.body.doc },
      { $set: {"Documents.$.accessHolders": newArr}}
    );
    var resultDoc = await ParchiUser.update(
      { _id: req.body.doctor },
      { $set: {PatientDocs: DocArray}}
    );
    res.status(200).json({result, resultDoc});
}
}



module.exports = [getFiles,getDoctors,addDocAccessToFile]