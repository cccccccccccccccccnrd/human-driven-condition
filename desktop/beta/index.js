const path = require('path')
const express = require('express')
const WebSocket = require('ws')

const app = express()
const wss = new WebSocket.Server({
  port: 2223
})

app.use('/beta/ui', express.static(path.join(__dirname, 'ui')))

app.listen(2222)
console.log('<-- human-driven condition (2021-) WWW listening on http://localhost:2222 WS listening on :2223')

const state = {
  devices: {}
}

function send (ws, type, payload) {
  const msg = {
    id: 'A00-SERVER',
    type,
    payload
  }

  ws.send(JSON.stringify(msg))
}

function broadcast (ws, type, payload) {
  wss.clients.forEach((client) => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      send(client, type, payload)
    }
  })
}

wss.on('connection', (ws) => {
  /* handle double connection from same device */
  ws.on('message', (message) => {
    const msg = JSON.parse(message)
    console.log(msg)

    switch (msg.type) {
      case 'get-state':
        send(ws, 'state', {
          state
        })
        break
      case 'do':
        broadcast(ws, 'do', msg.payload)
        break
      case 'open':
        ws.id = msg.id
        state.devices[msg.id] = {
          id: msg.id
        }
        break
      case 'closing':
        delete state.devices[msg.id]
        break
    }
  })

  ws.on('close', () => {
    if (ws.id) {
      console.log(ws.id, 'deleted')
    }
    delete state.devices[ws.id]
  })

  /* setInterval(() => {
    ws.send(JSON.stringify({
      do: 'toast'
    }))
  }, 5000)

  setInterval(() => {
    ws.send(JSON.stringify({
      do: 'exit'
    }))
  }, 11000) */
})