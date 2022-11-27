const jwt = require('jsonwebtoken')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

 function verifyToken(req, res, next) {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT,  (err, user) => {
      if (err) {
        res.status(404).json(err);
      } else {
        req.user = user;
      }
      console.log("VERIFICATION PASSED")
      next();
    });
  } else {
    res.status(404).json("UnAuthenticated User bruv");
  }
}

module.exports = verifyToken