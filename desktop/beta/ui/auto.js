const url = window.location.hostname === 'localhost' ? 'ws://localhost:2223' : 'ws://192.168.1.127:2223'
const socket = new WebSocket(url)
const id = 'A00-CLIENT'

const buttons = document.querySelectorAll('button')

let state = {}

socket.addEventListener('open', (message) => {
  init()
})

socket.addEventListener('message', (message) => {
  const msg = JSON.parse(message.data)
  console.log(msg)

  switch (msg.type) {
    case 'state':
      state = msg.payload.state
      reloadUi()
      break
  }
})

function reloadUi () {
  const deviceIds = Object.keys(state.devices)
  document.querySelector('#state').innerHTML = deviceIds.map((id) => `<p>${id}</p>`).join('')
}

function send (type, payload) {
  const msg = {
    id,
    type,
    payload
  }

  socket.send(JSON.stringify(msg))
}

function init () {
  send('get-state')
}

buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const id = event.target.id
    console.log(id)
    send('do', {
      do: id
    })
    button.classList.toggle('done')
  })
})