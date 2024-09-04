const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes')

dotenv.config()
connectDB()

const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/api/auth', authRoutes)

app.listen(5000, () => console.log('Server running on port 5000')
)