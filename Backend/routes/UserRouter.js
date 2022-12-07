const UserRouter = require("express").Router();
const verifyToken = require('../middleware/verify')
const [
//   createUrl,
  getFiles,
  getDoctors,
  addDocAccessToFile,
  getPatientFiles
//   deleteLink,
//   searchLinks,
//   updateLink,
] = require("../controllers/ParchiUser");
// UserRouter.post("/create", verifyToken, createUrl);
var cors = require('cors')
UserRouter.use(cors(corsOptionsDelegate))

var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
    corsOptions = { origin: true } // disable CORS for this request
  callback(null, corsOptions) // callback expects two parameters: error and options
}
UserRouter.get("/files", verifyToken, getFiles);
UserRouter.get("/pfiles", verifyToken, getPatientFiles);
UserRouter.get("/doctors", verifyToken, getDoctors);
UserRouter.post("/addDoc",verifyToken,addDocAccessToFile)

// UserRouter.delete("/delete/:short", verifyToken, deleteLink);
// UserRouter.get("/search", verifyToken, searchLinks);
// UserRouter.post("/update/:id", verifyToken, updateLink);

module.exports = UserRouter