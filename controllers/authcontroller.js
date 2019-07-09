const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.login = (req, res) => {
  let userData = req.body

  User.findOne({ email: userData.email }, (error, user) => {
    if(error){
      console.log(error)
    }else{
      if(!user){
        res.status(401).send('Invalid email')
      }else {
        if( user.password !== userData.password ){
          res.status(401).send('Invalid password')
        }else {
          let payload = {subject: user._id}
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).send({token})
        }
      }
    }
  })
}

exports.register = (req, res) => {
  let userData = req.body
  let user = new User(userData)
  user.save((error, registeredUser) => {
    if(error){
      console.log(error)
    }else{
      let payload = {subject: registeredUser._id}
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({token})
    }
  })
}