const AuthRouter = require("express").Router();
const [loginUser, registerUser, generateToken]= require("../controllers/authuser");


AuthRouter.post("/login",loginUser);
AuthRouter.post("/register", registerUser);
AuthRouter.post("/token", generateToken);

module.exports = AuthRouter