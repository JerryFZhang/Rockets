var express = require('express')
var app = express()
var serverConfig = require('./config.js').serverConfig
const PORT = serverConfig.port || 3001
var path = require('path')
var cors = require('cors');

// Load custom written library LaunchJS
const launch = require('./launch.js')
const LaunchJS = new launch()

// use it before all route definitions
app.use(cors({
    origin: 'http://localhost:3001'
    //React App destination is on port 3001
    //make this a config later
}));

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({
    extended: false
}))

app.get('/rocket', function (req, res) {
    LaunchJS.get().then(data => {
            res.send(JSON.stringify(data))
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
})

app.listen(PORT, () => console.log(`App Started on Port ${PORT}`));
module.exports = app