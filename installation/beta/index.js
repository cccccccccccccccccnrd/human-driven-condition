const path = require('path')
const express = require('express')
const WebSocket = require('ws')

const app = express()
const wss = new WebSocket.Server({
  port: 2728
})

app.use('/ui/back', express.static(path.join(__dirname, 'ui/back')))
app.use('/ui/front', express.static(path.join(__dirname, 'ui/front')))

app.listen(2727)
console.log('<-- human-driven condition (2021-) INSTALLATION listening on http://localhost:2727 WS listening on :2728')

const state = {
  devices: {},
  mode: 'artistic'
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

function handleClose (ws) {
  if (ws.id) {
    console.log(ws.id, 'deleted')
  }

  delete state.devices[ws.id]

  broadcast(ws, 'state', {
    state
  })
}

function handleOpen (ws, id) {
  if (state.devices.hasOwnProperty(id)) {
    console.log(id, 'already connected')
    ws.terminate()
    return
  }

  ws.id = id

  state.devices[id] = {
    id
  }

  broadcast(ws, 'state', {
    state
  })
}

function init () {
  setInterval(() => {
    const now = new Date()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()

    if (seconds === 0 && minutes === 0 || seconds === 0 && minutes === 20) {
      state.mode = 'artistic'
      broadcast(null, 'do', {
        do: state.mode
      })
    } else if (seconds === 0 && minutes === 20 || seconds === 0 && minutes === 50) {
      state.mode = 'research'
      broadcast(null, 'do', {
        do: state.mode
      })
    }
  }, 1000 * 1)
}

init()

wss.on('connection', (ws) => {
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
        handleOpen(ws, msg.id)
        break
    }
  })

  ws.on('close', () => {
    handleClose(ws)
  })
})