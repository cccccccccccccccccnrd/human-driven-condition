const path = require('path')
const express = require('express')
const WebSocket = require('ws')
const auto = require('./auto.js')

const app = express()
const wss = new WebSocket.Server({ port: 2223 })

app.use('/ui', express.static(path.join(__dirname, 'ui')))

app.listen(2222)
console.log('<-- human-driven condition (2021-) listening on http://localhost:2222')

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const msg = JSON.parse(message)
    try {
      auto[msg.do]()
      console.log('do', msg.do)
    } catch (error) {
      console.log('f')
    }
  })
})