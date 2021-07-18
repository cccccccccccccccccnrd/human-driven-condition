const robot = require('robotjs')

const TASKBAR_ICON = {
  x: 270,
  y: 1180
}

const EXEC_SCRIPT_BUTTON = {
  x: 80,
  y: 930
}

const SHOW_SCRIPTS_BUTTON = {
  x: 190,
  y: 930
}

const RELOAD_SCRIPTS_BUTTON = {
  x: 990,
  y: 365
}

const CLOSE_SCRIPTS_BUTTON = {
  x: 1080,
  y: 280
}

const CHOOSE_SCRIPT_BUTTON = {
  x: 230,
  y: 895
}

const SCRIPT_BUTTONS = {
  1: {
    x: 50,
    y: 925
  },
  2: {
    x: 50,
    y: 945
  },
  3: {
    x: 50,
    y: 970
  },
  4: {
    x: 50,
    y: 995
  },
  5: {
    x: 50,
    y: 1020
  }
}

const ADB_BUTTONS = {
  1: {
    x: 355,
    y: 645
  },
  2: {
    x: 355,
    y: 685
  },
  3: {
    x: 355,
    y: 725
  },
  4: {
    x: 355,
    y: 760
  },
  5: {
    x: 355,
    y: 795
  },
  6: {
    x: 355,
    y: 835
  },
  7: {
    x: 355,
    y: 870
  },
  8: {
    x: 355,
    y: 905
  },
  9: {
    x: 355,
    y: 945
  },
  10: {
    x: 355,
    y: 980
  }
}

function sleep (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function focus () {
  return new Promise((resolve) => {
    robot.keyTap('command')
    robot.moveMouseSmooth(TASKBAR_ICON.x, TASKBAR_ICON.y)
    robot.mouseClick()
    resolve()
  })
}

function reload () {
  return new Promise((resolve) => {
    robot.moveMouseSmooth(SHOW_SCRIPTS_BUTTON.x, SHOW_SCRIPTS_BUTTON.y)
    robot.mouseClick()
    robot.moveMouseSmooth(RELOAD_SCRIPTS_BUTTON.x, RELOAD_SCRIPTS_BUTTON.y)
    robot.mouseClick()
    robot.moveMouseSmooth(CLOSE_SCRIPTS_BUTTON.x, CLOSE_SCRIPTS_BUTTON.y)
    robot.mouseClick()
    resolve()
  })
}

function script (number) {
  return new Promise((resolve) => {
    robot.moveMouseSmooth(CHOOSE_SCRIPT_BUTTON.x, CHOOSE_SCRIPT_BUTTON.y)
    robot.mouseClick()
    robot.moveMouseSmooth(SCRIPT_BUTTONS[number].x, SCRIPT_BUTTONS[number].y)
    robot.mouseClick()
    robot.moveMouseSmooth(EXEC_SCRIPT_BUTTON.x, EXEC_SCRIPT_BUTTON.y)
    robot.mouseClick()
    resolve()
  })
}

function adb (number) {
  return new Promise((resolve) => {
    robot.moveMouseSmooth(ADB_BUTTONS[number].x, ADB_BUTTONS[number].y)
    robot.mouseClick()
    resolve()
  })
}

function selectAll () {
  return new Promise((resolve) => {
    robot.moveMouseSmooth(245, 680)
    robot.mouseToggle('down')
    robot.dragMouse(20, 615)
    robot.mouseToggle('up')
    resolve()
  })
}

function stop () {
  return new Promise((resolve) => {
    robot.moveMouseSmooth(20, 615)
    robot.mouseClick('right')
    robot.moveMouseSmooth(40, 780)
    robot.mouseClick()
    resolve()
  })
}

async function unlock () {
  await adb(1)
  await sleep(3000)
  await adb(4)
  await sleep(1000)
}

async function page () {
  await adb(7)
  await sleep(1000)
  await adb(7)
  await sleep(2000)
  await adb(6)
  await sleep(1000)
}

async function start ()  {
  await focus()
  await unlock()
  await page()
  await script(2)
  await sleep(20000)
  await stop()
  await page()
}

async function cam () {
  console.log('wow it worked')
  /* await focus()
  await unlock()
  await adb(8) */
}

/* reload() */
/* script(3) */
/* unlock() */
/* select() */
robot.setMouseDelay(2)
/* cam() */

/* while (true) {
  const mouse = robot.getMousePos()
  console.log(mouse)
} */

module.exports = {
  cam
}
