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
UserRouter.get("/files", verifyToken, getFiles);
UserRouter.get("/pfiles", verifyToken, getPatientFiles);
UserRouter.get("/doctors", verifyToken, getDoctors);
UserRouter.post("/addDoc",verifyToken,addDocAccessToFile)

// UserRouter.delete("/delete/:short", verifyToken, deleteLink);
// UserRouter.get("/search", verifyToken, searchLinks);
// UserRouter.post("/update/:id", verifyToken, updateLink);

module.exports = UserRouter