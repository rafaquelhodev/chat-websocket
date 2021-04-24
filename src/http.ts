import express from "express"
import { createServer } from "http"
import { Server, Socket } from "socket.io"
import path from "path"

import "./database"
import { routes } from "./routes"

const app = express()

const pathViews = path.join(__dirname, "..", "public")
app.use(express.static(pathViews))
app.set("views", pathViews)
app.engine("html", require("ejs").renderFile)
app.set("view engine", "html")

app.get("/pages/client", (req, res) => {
    return res.render("html/client.html")
})

//creating http protocol
const http = createServer(app)

//creating ws protocol
const io = new Server(http)

io.on("connection", (socket: Socket) => {
    console.log("Connected", socket.id)
})

app.use(express.json())

app.use(routes);

export { http, io }