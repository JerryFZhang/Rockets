var express = require('express')
var app = express()
const fs = require('fs')
const version = require('./package.json').version
var serverConfig = require('./config.js').serverConfig
const PORT = serverConfig.port || 3001
var path = require('path')
const launch = require('./launch.js')
const LaunchJS = new launch()
var cors = require('cors');

// use it before all route definitions
app.use(cors({
    origin: 'http://localhost:3001'
    //React App destination is on port 3001
    //make this a config later
}));

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
  LaunchJS.get().then(data => {
    var obj = {
      version: version,
      data: data
    }
    console.log("data")
    res.render('index', obj)
    })
    .catch(err => {
    console.log(err)
    })
})

app.get('/rocket', function (req, res) {
    console.log(req.body)
    LaunchJS.get().then(data => {
        console.log("data")
            res.send(JSON.stringify(data))
        })
        .catch(err => {
            console.log(err)
        })
})

app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));
module.exports = app
