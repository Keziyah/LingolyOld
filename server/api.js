'use strict'

const api = module.exports = require('express').Router()
const {Speech} = require('APP/db')

api
  .get('/heartbeat', (req, res) => res.send({ok: true}))
  .use('/auth', require('./auth'))
  .use('/users', require('./users'))
  .post('/newspeech', (req, res, next) => {
    console.log("REQ", req.body)
    Speech.create({content: req.body.content})
    .then(speech => {
      res.send(speech)
    })
    .catch(next)
  })
  .get('/speeches', (req, res, next) => {
    Speech.findAll({})
    .then(speeches => res.send(speeches))
    .catch(next)
  })
// No routes matched? 404.
api.use((req, res) => res.status(404).end())
