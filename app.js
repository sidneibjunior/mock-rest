var express = require('express');
var bodyParser = require('body-parser');
var pretty = require('express-prettify');
var fs = require('fs');

const BgCyan =  "\x1b[46m"
const BgRed = "\x1b[101m"
const BgGreen = "\x1b[102m"
const FgBlack = "\x1b[30m"
const Reset = "\x1b[0m"

const app = express();
app.use(pretty({ query: 'pretty' }));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

/** 
 * Requests logger
 **/
const logRequestStart = (req, res, next) => {
  res.on('finish', () => {
    const highlightColor = res.statusCode != 404 ? `${BgGreen}${FgBlack}` : `${BgRed}${FgBlack}`

    console.info("\n--------")
    console.info(`${highlightColor}${req.method}${Reset} ${req.originalUrl}   ${new Date()}`)

    if (res.statusCode != 404) {
      if (req.method != 'GET') {
        console.info()
        console.info(req.body)
      }
      
    } else {
      console.info(`${res.statusCode} ${res.statusMessage}`)
    }
  })

  next()
}
app.use(logRequestStart)


/**
 * Register endpoints mapped on 'config/endpoints.json'
 */
const registerEndpoints = function() {
  var endpoints = JSON.parse(fs.readFileSync('config/endpoints.json', 'utf8'));
  
  endpoints.forEach(endpoint => {

    console.info(`Exposing: ${BgCyan}${FgBlack}${endpoint.method.toUpperCase()}${Reset} ${endpoint.path}`)
    const body = endpoint.responseBody && JSON.parse(endpoint.responseBody, 'utf8') || {}

    app[endpoint.method](endpoint.path, (req, res) => {
      res.status(200).send(body)
    });
  });
}

registerEndpoints()

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});