/* 
  Version:
    AutoX 5.7.9 https://github.com/kkevsekk1/AutoX/actions/runs/1997774782#artifacts
    Auto.js Pro 7.0.4-1
  Inlcudes "web" as OkHttp http client?
*/

console.log(id)
const deviceId = device.getAndroidId()
const ws = web.newWebSocket('ws://192.168.0.131:2223')

function send (type, payload) {
  const msg = {
    id: deviceId,
    type: type,
    payload: payload
  }

  ws.send(JSON.stringify(msg))
}

function lock () {}

function unlock () {
  if (!device.isScreenOn()) {
    device.wakeUp()
    sleep(2000)
    gesture(320, [device.width * 0.5, device.height * 0.75], [device.width * 0.5, device.height * 0.25])
    sleep(500)
  }
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
      case 'launch':
        const result = launch('com.cnrd.hdc')
        log(result)
        break
      case 'toast':
        toast(device.getAndroidId())
        break
      case 'exit':
        exit()
        break
      case 'unlock':
        unlock()
        break
      case 'lock':
        lock()
        break
      case 'input':
        input(msg.payload.payload)
        break
    }
  }
})
