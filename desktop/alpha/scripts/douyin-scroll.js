const amount = 5
let count = 0

/* unlock() */
start()

function start() {
  setScreenMetrics(1080, 1920)
  click(660, 790)
  sleep(5000)
  id('avg').findOne().click()
  sleep(1000)
  input('工厂生活')

  /* const i = setInterval(() => {
    count = count + 1
    if (count === amount) {
      clearInterval(i)
      home()
      engines.stopAll()
    }
    gesture(320, [device.width * 0.5, device.height * 0.75], [device.width * 0.5, device.height * 0.25])
  }, 5000) */

  /* while (true) {
    id('bv4').findOne().click()
  } */
}

function unlock () {
  if (!device.isScreenOn()) {
    device.wakeUp()
    sleep(2000)
    gesture(320, [device.width * 0.5, device.height * 0.75], [device.width * 0.5, device.height * 0.25])
    sleep(500)
  }
}
