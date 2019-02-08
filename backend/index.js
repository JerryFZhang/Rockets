var express = require('express')
var app = express()

// Load server config for future deployment
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

app.use(express.static(path.join(__dirname, 'public')))

// `/rocket` endpoint that gets launch data from API
app.get('/rocket/:next', (req, res) => {
  LaunchJS.get(req.params.next).then(data => {
    res.send(data)
  })
    .catch(err => {
      res.send(err)
    })
})

app.listen(PORT, () => console.log(`App Started on Port ${PORT}`))
module.exports = app
