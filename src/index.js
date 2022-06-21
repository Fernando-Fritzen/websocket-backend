
const express = require('express')
const http = require('http')
const { Server } = require("socket.io")
const cors = require('cors')
const run = require('./database')

const app = express()
app.use(cors())
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*"
    }
})
server.listen(3001, () => {
    console.log("Rodando....")
});

const listMarkers = async () => {
    const database = await run()
    const marker = await database.find({}).toArray()

    io.emit('allMarkers', marker)
}

const saveMarker = async (data) => {
    const database = await run()
    await database.insertOne(data)

    const marker = await database.find({}).toArray()
    io.emit('allMarkers', marker)
    
}

io.on('connection', (socket) => {
    listMarkers()

    socket.on('listAll', () => {
        listMarkers()
        console.log("buscou")
    })

    socket.on('saveMarker', (marker) => {
        console.log("socket salvar")
        saveMarker(marker)
    })

})
