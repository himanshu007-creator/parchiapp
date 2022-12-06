const jwt = require('jsonwebtoken')
require('dotenv').config()

 function verifyToken(req, res, next) {
  res.header({"Access-Control-Allow-Origin": "*"});
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT,  (err, user) => {
      if (err) {
        res.status(404).json(err);
      } else {
        req.user = user;
      }
      next();
    });
  } else {
    res.status(404).json("UnAuthenticated User bruv");
  }
}

module.exports = verifyToken