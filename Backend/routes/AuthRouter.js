const AuthRouter = require("express").Router();
const [loginUser, registerUser, generateToken]= require("../controllers/authuser");

var cors = require('cors')
AuthRouter.use(cors(corsOptionsDelegate))

var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
    corsOptions = { origin: true } // disable CORS for this request
  callback(null, corsOptions) // callback expects two parameters: error and options
}
AuthRouter.post("/login",loginUser);
AuthRouter.post("/register", registerUser);
AuthRouter.post("/token", generateToken);

module.exports = AuthRouter