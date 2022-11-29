const http = require('http')

const hostname = '127.0.0.1'

const port = 3000

const responseJson = {
  success: true,
  canIGetCoffee: false,
  responseCode: 0123
}

const server = http.createServer((req, res) => {
  if (req.method === 'GET'){
    // Reto 2
    statusCode = 400
    response = { success: false}
    switch (req.url) {
      case '/ping':
        statusCode = 200
        response = { success: true, body: 'pong' }
        break;
      case '/health':
        statusCode = 200
        response = { success: true, body: { version: '1.0.0', launchDate: new Date() } }
        break
      default:
        statusCode = 200
        response = { success: true, body: 'API Bedu V1' }
    }
    res.statusCode = statusCode
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(response))
  } else {
    res.statusCode = 418
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(responseJson))
  }
})

server.listen(port, hostname, () => {
  console.log(`Servidor corriendo http://${hostname}:${port}`)
})