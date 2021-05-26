const path = require('path')
const express = require('express')

const app = express()

app.use('/', express.static(path.join(__dirname, 'public')))

app.listen(2444)
console.log('<-- human driven condition (2021-) listening on http://localhost:2444')