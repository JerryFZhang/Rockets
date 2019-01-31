const req = require("request")
const moment = require("moment")
const queryString = require("query-string")
class LaunchJS {
    constructor() {
        this.timeoutVal = 20000
        // added different types of reques parameters later
    }
    timeout(milliseconds) {
        if (milliseconds) {
            this.timeoutVal = milliseconds
        } else {
            this.timeoutVal = null
        }
        return this
    }
    _generateReqUrl() {
        this.url = `http://localhost:3000/example.json`
    }
    get() {
        console.log("get")
        return new Promise((resolve, reject) => {
            this._generateReqUrl()
            req({
                url: this.url,
                json: true,
                timeout: this.timeoutVal
            }, (err, res, body) => {
                if (err) {
                    console.log('err')
                    reject(`Launch data cannot be retrieved. ERROR: ${err}`)
                    return
                }
                if (res.statusCode !== 200) {
                    console.log('err')
                    reject(`Launch data cannot be retrieved. Response: ${res.statusCode} ${
                res.statusMessage
              }`)
                    return
                }
//                console.log(body)
                resolve(body)
            })
        })
    }
}
module.exports = LaunchJS
