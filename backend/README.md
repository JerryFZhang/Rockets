# Rockets
The NodeJS App displays space launch missions arounde the world. 

## How to start the server

1. Make sure Node and NPM are installed by typing `node -v` in the command line. If NPM is not installed please proceed to [this page](https://nodejs.org/en/download/) to install Node. 

2. `cd` to the folder the Warmer repo is in, for example, `cd ~/Downloads/Rockets/` or cd `C:\\GitHub\Rockets\`
3. Install project dependency by typing in `npm install`.

4. Start the server by typing node app.js, if you wish to start server by using ports other than 3000, modify the port number in ./config.json. 

5. Visit the app from [localhost:3000](http://localhost:3000)

## Technology

### Architecture

### Backend
[Node.js](http://nodejs.org) and [Express.js](https://expressjs.com) are used to setup routing and request handling. With the help of other open source NPM packages.

#### [Express.js](https://expressjs.com):
Express.js is a web framework for Node.js environment, it handles all the endpoint requests and responses including routing, parsing, listening and responding both HTTP and HTTPS requests.



### Front-end 

#### [Bootstrap](https://getbootstrap.com) 
Bootstrap is used as the UI framework, it provides tons of features to make web application adapt to different screen sizes and aspect ratios.

#### [Moment.js](http://momentjs.com)
Moment.js is used to parse timestamp and display date information in the correct format in various languages and format. The app uses Moment.js in the frontend to parse time-related information.


#### [LESS](http://lesscss.org) 
LESS can be compiled to CSS on page load. LESS supports classes and variable, making developing and maintaining CSS code a breeze.


#### [Launch Library API](https://launchlibrary.net) 
Launch Library is used as the source of launch information.


### Hosting Platform
[Linode](https://www.linode.com)