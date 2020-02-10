console.log('Running')
let myString = 'Password123'

//*    This block is the method for hashing a regular password   *//
// var passwordHash = require('password-hash')

// var hashedPassword = passwordHash.generate(myString)

// console.log(hashedPassword)


//*    This block is the method for verifying a hashed password    *//
var passwordHash = require('password-hash')

var hashedPassword = 'sha1$212d54f0$1$d75f5e083f9ce9fa2c7c8e0005ed3e586069b360'

console.log(passwordHash.verify(myString, hashedPassword))

console.log(passwordHash.verify('Poo', hashedPassword))
