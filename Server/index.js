import express from 'express'
import socket from './socket/socket.js'
import {Server as webSocket } from 'socket.io'
import dbconnection from "./database/connectdb.js"
import "dotenv/config"
import http from 'http'
import cors from 'cors'
const PORT=process.env.PORT ||  4000

const app= express()
const Server=http.createServer(app)
const httpServer=Server.listen(PORT,()=>{
    console.log("servidor corriendo en el puerto " + PORT);
})

const io = new webSocket(httpServer,{
    cors:{
        origin:"*"
    }
})
dbconnection()
app.use(cors())
app.use(express.json())
 socket(io)


