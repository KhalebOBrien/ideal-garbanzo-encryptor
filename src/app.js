const express = require('express')
const morgan = require('morgan')
const obfuscate = require('html-obfuscator')
const fs = require('fs')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()
const PORT = process.env.PORT || 3800

const app = express()

// setup view engine
app.set('view engine', 'ejs')
app.use(express.static(path.join('output')))
app.use(express.static(path.join('input')))
app.use(express.json())

// setup logger
app.use(morgan('dev'))

// start server
app.listen(PORT, () => {
  console.log(`Ideal-Encryptor running at http://localhost:${PORT}`)
})

const runEncrypt = async (type='uob') => {
  if (type == 'of') {
    await fs.writeFileSync('output/obfuscated.html', obfuscate('input/file.html', { type: "file" }))
    console.log('file obfuscated')
  }

  if (type == 'dof') {
    const str = await fs.readFileSync('input/atob.txt')
    let buff = new Buffer(str, 'base64');
    await fs.writeFileSync('output/unatob.html', buff, { type: "file" })

    console.log('file deobfuscated')
  }
}

// app.use('/ua', async (req, res) => {
//   const str = await fs.readFileSync('input/atob.txt')
//   let buff = new Buffer(str, 'base64');
//   await fs.writeFileSync('output/unatob.html', buff, { type: "file" })

//   res.render('index', {})
// })
// app.use('/', (req, res) => {
//   fs.writeFileSync('output/obfuscated.html', obfuscate('input/file.html', { type: "file" }))

//   res.render('index', {})
// })

app.use((req, res) => {
  res.render('404', {})
})

runEncrypt('of');
