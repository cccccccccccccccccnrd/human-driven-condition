const url = window.location.hostname === 'localhost' ? 'ws://localhost:2728' : 'wss://hdc.cnrd.computer/ws'
const socket = new WebSocket(url)
const id = 'A00-FRONT'

const video = document.querySelector('#video')

let state = {}
const ui = {
  prev: null,
  duration: 5000,
  notifications: {
    5: {
      text: 'Great notification'
    }
  }
}

function mode (name) {
  switch (name) {
    case 'artistic':
      video.currentTime = 0
      break
    case 'research':
      video.currentTime = 60
      break
  }

  video.style.opacity = 1
  video.muted = false
}

function notification (index) {
  const notification = document.createElement('div')
	notification.innerHTML = `${ui.notifications[index].text}`
  document.querySelector('#ui').appendChild(notification)

  setTimeout(() => {
		document.querySelector('#ui').removeChild(notification)
	}, ui.duration)

  setTimeout(() => {
		notification.classList.add('swipe-out')
	}, ui.duration - 300)
}

/* video.addEventListener('timeupdate', (event) => {
  const current = Math.floor(video.currentTime)
  if (ui.prev !== current && ui.notifications.hasOwnProperty(current)) {
    notification(current)
  }
  console.log(current)
  ui.prev = current
}) */

socket.addEventListener('open', (message) => {
  init()
})

socket.addEventListener('message', (message) => {
  const msg = JSON.parse(message.data)
  console.log(msg)

  switch (msg.type) {
    case 'state':
      state = msg.payload.state
      console.log(state)
      break
    case 'do':
      switch (msg.payload.do) {
        case 'artistic':
          mode(msg.payload.do)
          console.log(msg.payload.do)
          break
        case 'research':
          mode(msg.payload.do)
          console.log(msg.payload.do)
          break
      }
  }
})

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