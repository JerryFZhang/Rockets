var express = require('express')
var app = express()
const fs = require('fs')
const version = require('./package.json').version
var serverConfig = require('./config.js').serverConfig
const PORT = serverConfig.port || 3001
var path = require('path')
const launch = require('./launch.js')
const LaunchJS = new launch()

var bodyParser = require('body-parser')
// set the view engine to ejs
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
//app.use(cookieParser())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.get('/', function (req, res) {
  console.log(req.body)
  // TODO: Parse location in request JSON.
  LaunchJS.get().then(data => {
    var obj = {
      version: version,
      data: data
    }
    res.render('index', obj)
    console.log("here")
    console.log(data)
})
.catch(err => {
    console.log(err)
})
  
})

app.get('/rocket', function (req, res) {
    console.log(req.body)
    LaunchJS.get().then(data => {
            res.send(JSON.stringify(data))
        })
        .catch(err => {
            console.log(err)
        })
})

app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));
module.exports = app
