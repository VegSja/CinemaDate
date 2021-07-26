const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
  const token = req.cookies.JWT
  if (token == null) return  res.sendStatus(401)

  jwt.verify(token, process.env.SECRET, function(err, user){    
    if (err){
      console.log(err)
      return res.sendStatus(403)
    } 
    req.user = user

    next()
  })
}

module.exports = authenticateToken
