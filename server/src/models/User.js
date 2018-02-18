// module to define the User model

// promise library
const Promise = require('bluebird')

// include bcrypt while converting the library into promises to allow
// for callback functionality
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user, options) {
  const SALT_FACTOR = 8

  if (!user.changed('password')) {
    return
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashSync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
    })
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      // beforeCreate: hashPassword,
      // beforeUpdate: hashPassword,
      beforeSave: hashPassword
    }
  })

  // assuming that the password is stored using bcrypt
  // we can just compare what exists in the model with the user input
  User.prototype.comparePassword = function (password) {
    console.log(password, this.password)
    return bcrypt.compareAsync(password, this.password)
  }
  return User
}
