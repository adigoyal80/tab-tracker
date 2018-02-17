// index for models, initialises db and adds models to db

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

// Init sequelize instance based off of config module

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

// Find all models in models dir and add them to the db model
fs
  .readdirSync(__dirname)
  .filter((file) =>
    file !== 'index.js'
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

// adding sequelize instance and Sequelize module to db
db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
