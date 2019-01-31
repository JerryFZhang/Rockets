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
        //  For testing purposes
        // this.url = `http://localhost:3000/example.json` 
        // Set API base URL
        this.url = `https://launchlibrary.net/1.4/launch/next/20`
    }
    get() {
        return new Promise((resolve, reject) => {
            this._generateReqUrl()
            req({
                url: this.url,
                json: true,
                timeout: this.timeoutVal
            }, (err, res, body) => {
                if (err) {
                    reject(`Launch data cannot be retrieved. ERROR: ${err}`)
                    return
                }
                if (res.statusCode !== 200) {
                    reject(`Launch data cannot be retrieved. Response: ${res.statusCode} ${
                res.statusMessage
              }`)
                    return
                }
                resolve(body)
            })
        })
    }
}
module.exports = LaunchJS