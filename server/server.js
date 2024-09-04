const express = require('express');
const http = require('http')
const {Server} = require('socket.io')
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes')
const carRoutes = require('./routes/carRoutes')
const mechanicRoutes = require('./routes/mechanicRoutes')

dotenv.config()
connectDB()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use('/api/auth', authRoutes)
app.use('/api/cars', carRoutes)
app.use('/api/mechanics', mechanicRoutes)

io.on('connection', (socket) => {
    console.log('New client connected');
    
    socket.on('updateMechanicLocation', (locationData) => {
        io.emit('mechanicLocationUpdated', locationData)
    })

    socket.on('disconnect', () => {
        console.log('Client disconnected');
        
    })
})

app.listen(5000, () => console.log('Server running on port 5000')
)