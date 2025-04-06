// import { createClient } from 'redis'
// import express from 'express'
// import cors from 'cors'
// import { v4 } from 'uuid'
// import promMid from 'express-prometheus-middleware'

// const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379'
// const REDIS_REPLICAS_URL = process.env.REDIS_REPLICAS_URL || REDIS_URL
// const port = process.env.PORT || 3000
// const UUID = v4()

// const client = createClient({
//   url: REDIS_URL,
// })

// const readClient = createClient({
//   url: REDIS_REPLICAS_URL,
// })

// const log = (...str) => console.log(`${new Date().toUTCString()}: `, ...str)

// client.on('error', (err) => log('Redis Client Error', err))
// readClient.on('error', (err) => log('Redis Replicas Client Error', err))

// await Promise.all([client.connect(), readClient.connect()])

// await client.set('key', 'redis connected to ' + REDIS_URL)
// const value = await client.get('key')
// log(value)
// log(`redis replicas connected to ${REDIS_REPLICAS_URL}`)

// log(`Set "key" value to "${value}"`)

// export const app = express()
// app.use(cors())
// app.use(express.json())
// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// )

// app.use(
//   promMid({
//     metricsPath: '/metrics',
//     collectDefaultMetrics: true,
//   })
// )

// app.get('/', (req, res) => {
//   const now = Date.now()
//   log('It is working, good job ', UUID, now)
//   res.send(`It is working, good job ${UUID} ${now}`)
// })

// app.get('/item', (req, res) => {
//   log('get item', req.query.id)
//   const key = req.query.id
//   readClient.get(key).then((value) => res.send(value))
// })

// app.post('/item', (req, res) => {
//   const { id, val } = req.body
//   log('post item', id, val)
//   client
//     .set(id, val)
//     .then((_) => res.send('ok'))
//     .catch((err) => res.status(500).send(err.message))
// })

// app.delete('/item', (req, res) => {
//   log('delete item', res.body.id)
//   const { id } = req.body
//   client.del(id).then((_) => res.send('ok'))
// })

// app.get('/items', (req, res) => {
//   log('get items')
//   readClient.keys('*').then((keys) => res.send(JSON.stringify(keys)))
// })

// app.listen(port, () => {
//   log(`listening at http://localhost:${port} server ${UUID}`)
// })


import { createClient } from 'redis'
import express from 'express'
import cors from 'cors'
import { v4 } from 'uuid'
import promMid from 'express-prometheus-middleware'

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379'
const REDIS_REPLICAS_URL = process.env.REDIS_REPLICAS_URL || REDIS_URL
const port = process.env.PORT || 3000
const UUID = v4()

// Création des clients Redis
const client = createClient({
  url: REDIS_URL,
})

const readClient = createClient({
  url: REDIS_REPLICAS_URL,
})

const log = (...str) => console.log(`${new Date().toUTCString()}: `, ...str)

client.on('error', (err) => log('Redis Client Error', err))
readClient.on('error', (err) => log('Redis Replicas Client Error', err))

// Connexion aux clients Redis
await Promise.all([client.connect(), readClient.connect()])

// Enregistrer une clé de test dans Redis
await client.set('key', 'redis connected to ' + REDIS_URL)
const value = await client.get('key')
log(value)
log(`redis replicas connected to ${REDIS_REPLICAS_URL}`)

log(`Set "key" value to "${value}"`)

// Créer l'application Express
const app = express()

// Configuration CORS pour permettre les requêtes depuis ton frontend
app.use(cors({
  origin: 'http://redis-react.default.svc.cluster.local:8080', // L'URL de ton frontend
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Intégrer Prometheus pour la collecte de métriques
app.use(
  promMid({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
  })
)

// Route principale
app.get('/', (req, res) => {
  const now = Date.now()
  log('It is working, good job ', UUID, now)
  res.send(`It is working, good job ${UUID} ${now}`)
})

// Route pour récupérer un item par ID
app.get('/item', (req, res) => {
  log('get item', req.query.id)
  const key = req.query.id
  readClient.get(key).then((value) => res.send(value))
})

// Route pour créer ou mettre à jour un item
app.post('/item', (req, res) => {
  const { id, val } = req.body
  log('post item', id, val)
  client
    .set(id, val)
    .then((_) => res.send('ok'))
    .catch((err) => res.status(500).send(err.message))
})

// Route pour supprimer un item
app.delete('/item', (req, res) => {
  log('delete item', res.body.id)
  const { id } = req.body
  client.del(id).then((_) => res.send('ok'))
})

// Route pour récupérer tous les items (les clés)
app.get('/items', (req, res) => {
  log('get items')
  readClient.keys('*').then((keys) => res.send(JSON.stringify(keys)))
})

// Démarrer le serveur Express
app.listen(port, () => {
  log(`listening at http://localhost:${port} server ${UUID}`)
})
