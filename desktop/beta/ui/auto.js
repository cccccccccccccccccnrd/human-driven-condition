const url = window.location.hostname === 'localhost' ? 'ws://localhost:2223' : 'ws://192.168.1.127:2223'
const socket = new WebSocket(url)

const buttons = document.querySelectorAll('button')

buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const id = event.target.id
    console.log(id)
    socket.send(JSON.stringify({
      do: id
    }))
    button.classList.toggle('done')
  })
})