const path = require('path')
const express = require('express')
const WebSocket = require('ws')

const app = express()
const wss = new WebSocket.Server({ port: 2223 })

app.use('/beta/ui', express.static(path.join(__dirname, 'ui')))

app.listen(2222)
console.log('<-- human-driven condition (2021-) WWW listening on http://localhost:2222 WS listening on :2223')

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const msg = JSON.parse(message)
    console.log(msg)

    try {
      console.log('do', msg.do)
    } catch (error) {
      console.log('f')
    }
  })

  setInterval(() => {
    ws.send(JSON.stringify({
      do: 'toast'
    }))
  }, 5000)

  setInterval(() => {
    ws.send(JSON.stringify({
      do: 'exit'
    }))
  }, 11000)
})