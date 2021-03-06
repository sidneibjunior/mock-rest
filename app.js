var express = require('express');
var bodyParser = require('body-parser');
var pretty = require('express-prettify');
var fs = require('fs');
var basicAuth = require('basic-auth')

const BgCyan =  "\x1b[46m"
const BgRed = "\x1b[101m"
const BgGreen = "\x1b[102m"
const FgBlack = "\x1b[30m"
const Reset = "\x1b[0m"

const app = express();
app.use(pretty({ query: 'pretty' }));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());

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

const authorizeRequest = function(req, res, config) {
  const configAuth = config.authorization
  if (configAuth && configAuth.type == "basic") {
    const credentials = basicAuth(req)

    const user = configAuth.username
    const pass = configAuth.password
 
    if (!credentials || credentials.name != user || credentials.pass != pass) {
      res.statusCode = 401
      res.setHeader('WWW-Authenticate', 'Basic realm="example"')
      res.end('Access denied')

      return false
    }
  }

  return true;
}

/**
 * Register endpoints mapped on 'config/endpoints.json'
 */
const registerEndpoints = function() {
  const config = JSON.parse(fs.readFileSync('config/mock-rest-config.json', 'utf8'));
  const endpoints = config.endpoints
  
  endpoints.forEach(endpoint => {

    console.info(`Exposing: ${BgCyan}${FgBlack}${endpoint.method.toUpperCase()}${Reset} ${endpoint.path}`)
    const body = endpoint.responseBody && JSON.parse(endpoint.responseBody, 'utf8') || {}

    app[endpoint.method](endpoint.path, (req, res) => {
      
      if (authorizeRequest(req, res, config)) {
        res.status(200).send(body)
      }
      
    });
  });
}

registerEndpoints()

const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
