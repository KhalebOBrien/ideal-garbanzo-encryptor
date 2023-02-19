const express = require('express')
const morgan = require('morgan')
const obfuscate = require('html-obfuscator')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()
const PORT = process.env.PORT || 3000

const app = express()

// setup view engine
app.set('view engine', 'ejs')
app.use(express.static(path.join('assets')))
app.use(express.json())

// setup logger
app.use(morgan('dev'))

// start server
app.listen(PORT, () => {
  console.log(`Ideal-Encryptor running at http://localhost:${PORT}`)
})

app.use('/', (req, res) => {
  res.render('index', {})
})

app.use((req, res) => {
  res.render('404', {})
})
