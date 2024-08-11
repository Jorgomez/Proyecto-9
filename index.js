require('dotenv').config()
const express = require('express')
const { connectDB } = require('./src/config/db')
const laptopsRouter = require('./src/api/routes/laptop')

const app = express()

connectDB()

app.use(express.json())

app.use('/api/v1/laptops', laptopsRouter)

app.use('*', (req, res, next) => {
  return res.status(404).json('route not found')
})

app.listen(3000, () => {
  console.log('Server deployed at http://localhost:3000')
})
