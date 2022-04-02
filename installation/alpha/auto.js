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
  return new Promise(async (resolve) => {
    robot.keyTap('command')
    robot.moveMouse(TASKBAR_ICON.x, TASKBAR_ICON.y)
    await sleep(500)
    robot.mouseClick()
    resolve()
  })
}

function reload () {
  return new Promise(async (resolve) => {
    robot.moveMouse(SHOW_SCRIPTS_BUTTON.x, SHOW_SCRIPTS_BUTTON.y)
    await sleep(500)
    robot.mouseClick()
    robot.moveMouse(RELOAD_SCRIPTS_BUTTON.x, RELOAD_SCRIPTS_BUTTON.y)
    await sleep(500)
    robot.mouseClick()
    robot.moveMouse(CLOSE_SCRIPTS_BUTTON.x, CLOSE_SCRIPTS_BUTTON.y)
    await sleep(500)
    robot.mouseClick()
    resolve()
  })
}

function script (number) {
  return new Promise(async (resolve) => {
    robot.moveMouse(CHOOSE_SCRIPT_BUTTON.x, CHOOSE_SCRIPT_BUTTON.y)
    await sleep(500)
    robot.mouseClick()
    robot.moveMouse(SCRIPT_BUTTONS[number].x, SCRIPT_BUTTONS[number].y)
    await sleep(500)
    robot.mouseClick()
    robot.moveMouse(EXEC_SCRIPT_BUTTON.x, EXEC_SCRIPT_BUTTON.y)
    await sleep(500)
    robot.mouseClick()
    resolve()
  })
}

function nextScript () {
  return new Promise(async (resolve) => {
    robot.moveMouse(CHOOSE_SCRIPT_BUTTON.x, CHOOSE_SCRIPT_BUTTON.y)
    await sleep(500)
    robot.mouseClick()
    robot.keyTap('down')
    await sleep(500)
    robot.mouseClick()
    robot.moveMouse(EXEC_SCRIPT_BUTTON.x, EXEC_SCRIPT_BUTTON.y)
    await sleep(500)
    robot.mouseClick()
    resolve()
  })
}

function adb (number) {
  return new Promise(async (resolve) => {
    robot.moveMouse(ADB_BUTTONS[number].x, ADB_BUTTONS[number].y)
    await sleep(1000)
    robot.mouseClick()
    resolve()
  })
}

function selectAll () {
  return new Promise(async (resolve) => {
    robot.moveMouse(245, 680)
    await sleep(250)
    robot.mouseToggle('down')
    robot.dragMouse(20, 615)
    robot.mouseToggle('up')
    resolve()
  })
}

function stop () {
  return new Promise(async (resolve) => {
    robot.moveMouse(20, 615)
    await sleep(250)
    robot.mouseClick('right')
    robot.moveMouse(40, 780)
    await sleep(250)
    robot.mouseClick()
    resolve()
  })
}

async function unlock () {
  await focus()
  await adb(1)
  await sleep(3000)
  await adb(4)
  await sleep(1000)
  await page()
}

async function page () {
  await adb(7)
  await adb(7)
  await adb(6)
}

async function reset ()  {
  await focus()
  await adb(8)
  await adb(8)
  await adb(7)
}

async function cam () {
  await focus()
  await unlock()
  await adb(8)
}

async function first () {
  await script(1)
}

async function next () {
  await nextScript()
}

robot.setMouseDelay(2)

/* while (true) {
  const mouse = robot.getMousePos()
  console.log(mouse)
} */

module.exports = {
  unlock,
  reset,
  first,
  next,
  cam
}
