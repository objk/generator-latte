import path from 'path'
import jsonServer from 'json-server'
import * as apis from '../src/api/api'

const routes = {}

for (const key in apis.default) {
  const value = apis.default[key].split(':')[1]
  const arr = value.split('/')
  const route = value
  const filename = arr[arr.length -1]

  routes[route] = '../data/' + filename + '.json'
}

console.log(routes)
// routes expect
// {
//   '/bron/bbc/cust/plugin/portal/tpa/getProductInfo': '../data/bflag.json',
// }

var server = jsonServer.create()
var middlewares = jsonServer.defaults()

server.use(middlewares)

Object.keys(routes).map(name => {
  let json = path.resolve('./data/', routes[name])
  server.use(name, (req, res) => {
    res.sendFile(json)
  })
})

server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }

  next()
})

server.listen(3000, function () {
  console.log('JSON Server is running at: http://127.0.0.1:3000/')
})