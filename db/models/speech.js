'use strict'

const { TEXT } = require('sequelize')

module.exports = db => db.define('speech', {
  content: TEXT
})
