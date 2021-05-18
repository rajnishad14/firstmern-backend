import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routes/post.js'
import dotenv from 'dotenv'
const app = express()
dotenv.config()
//middlewares

app.use(express.json({ limit: '30mb' }))
app.use(express.urlencoded({ extended: true, limit: '30mb' }))
app.use(cors())

app.get('/', (req, res) => {
  res.send('this is home page')
})
//mongodb
const CONNECTION_URL = process.env.CONNECTION_URL
const port = process.env.PORT || 5000
//routes
app.use('/posts', postRoutes)
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log('server is running at port:', port)
    })
  })
  .catch((error) => {
    console.log(error)
  })
mongoose.set('useFindAndModify', false) //wont get any worning in console
