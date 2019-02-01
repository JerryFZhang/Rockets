var express = require('express')
var app = express()
var serverConfig = require('./config.js').serverConfig
const PORT = serverConfig.port || 4000
var path = require('path')
var cors = require('cors')

// Load custom written library LaunchJS
const Launch = require('./launch.js')
const LaunchJS = new Launch()

// use it before all route definitions
app.use(cors({
  origin: 'http://localhost:3000'
  // React App destination is on port 3000
  // make this a config later
}))

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({
  extended: false
}))

app.get('/rocket', (req, res) => {
  LaunchJS.get().then(data => {
    res.send(JSON.stringify(data))
  })
    .catch(err => {
      console.log(err)
      res.send(err)
    })
})

app.listen(PORT, () => console.log(`App Started on Port ${PORT}`))
module.exports = app
