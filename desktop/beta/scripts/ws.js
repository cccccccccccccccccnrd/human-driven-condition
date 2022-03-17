/* 
  Version: Auto.js Pro 7.0.4-1
  Inlcudes "web" as OkHttp http client?
*/

console.log(id)
const deviceId = 'A04-04'
const ws = web.newWebSocket('ws://192.168.178.47:2223')

function send (type, payload) {
  const msg = {
    id: deviceId,
    type: type,
    payload: payload
  }

  ws.send(JSON.stringify(msg))
}

ws.on('open', (res, ws) => {
  send('open')
})

ws.on('closing', (cause, reason, ws) => {
  send('closing')
})

ws.on('text', (message, ws) => {
  const msg = JSON.parse(message)
  console.log(msg)

  if (msg.type === 'do') {
    switch (msg.payload.do) {
      case 'toast':
        toast('toast')
        break
      case 'exit':
        exit()
        break
    }
  }
})