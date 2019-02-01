const req = require('request')

class LaunchJS {
  constructor () {
    this.timeoutVal = 20000
    // added different types of requests parameters for more functionality
  }
    
  timeout (milliseconds) {
    if (milliseconds) {
      this.timeoutVal = milliseconds
    } else {
      this.timeoutVal = null
    }
    return this
  }
    
  _generateReqUrl () {
    // Set API base URL
    this.url = `https://launchlibrary.net/1.4/launch/next/20`
  }
   
  get () {
    return new Promise((resolve, reject) => {
      this._generateReqUrl()
      req({
        url: this.url,
        json: true,
        timeout: this.timeoutVal
      }, (err, res, body) => {
        if (err) {
          reject(new Error(`Launch data cannot be retrieved. ERROR: ${err}`))
          return
        }
        if (res.statusCode !== 200) {
          reject(new Error(`Launch data cannot be retrieved. Response: ${res.statusCode} ${res.statusMessage}`))
          return
        }
        resolve(body)
      })
    })
  }
}
module.exports = LaunchJS
