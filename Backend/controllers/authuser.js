const ParchiUser = require('../models/user')
require('dotenv').config()
const cryptoJs = require("crypto-js")
const jwt = require("jsonwebtoken")

var refreshTokens= [];
 function logout(req, res) {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.status(204).json("LOGGED OUT");
}
 function generateToken(req, res) {
  const refreshtoken = req.body.refreshtoken;
  if (refreshtoken == null) return res.status(401);
  jwt.verify(refreshtoken, process.env.JWT, (err, user) => {
    if (err) {
      return res.status(403);
    }
    const Token = {
      username: user.username,
      role: user.role
    };
    const AccessToken = jwt.sign(Token, process.env.JWT);

    res.status(200).json({ accessToken: AccessToken });
  });
}
 async function loginUser(req, res){
  try {
    const user = await ParchiUser.findOne({ username: req.body.username });
    if(!user){
      return res.status(401).json("Wrong credentials");
    } 
    else{
      const hashpassword = cryptoJs.AES.decrypt(user.password, process.env.JWT);
    const Origpassword = hashpassword.toString(cryptoJs.enc.Utf8);
    Origpassword !== req.body.password && res.status(401).json({status:"failure",details: "wrong credentials"});
    const Token = {
      username: user.username,
      role: user.role
    };
    const AccessToken = jwt.sign(Token, process.env.JWT);
    const refreshtoken = jwt.sign(Token, process.env.JWT);
    // const { password, ...others } = user._doc;
    res.status(200).json({ accesstoken: AccessToken, refreshtoken: refreshtoken , role: user.role });
    }
    
  } catch (err) {
    return res.status(400).json({"ERROR BKL: ": err});
  }
}
 async function registerUser(req, res) {
  let data = {
    username: req.body.username,
    password: cryptoJs.AES.encrypt(req.body.password, process.env.JWT),
    role: req.body.role
  }
  const user = new ParchiUser(data);
  // + req.originalUrl

  try {
    const exist = await ParchiUser.findOne({ username: req.body.username });
    if (exist == null) {
      const saveuser = user
      const result = await saveuser.save();
      res.status(200).json({status:"success", details:result});
    }
    else{
      res.status(400).json({status:"failure",details: "user already exist"});
    }
  } catch (err) {
    res.status(500).json({status:"failure",details: err});
  }
}
module.exports = [loginUser, registerUser, generateToken]