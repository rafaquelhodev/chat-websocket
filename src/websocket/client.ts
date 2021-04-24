import { Socket } from "socket.io"
import { Connection } from "../entities/Connection"
import { io } from "../http"
import { ConnectionsService } from "../services/ConnectionsService"
import { MessagesService } from "../services/MessagesService"
import { UsersService } from "../services/UsersService"

interface IParams {
    text: string
    email: string
}

io.on("connect", (socket) => {
    const connectionsService = new ConnectionsService()
    const messagesService = new MessagesService()
    const usersService = new UsersService()

    socket.on("client_first_access", async params => {
        let socket_id = socket.id

        const { text, email } = params as IParams

        let user = await usersService.findByEmail(email)

        let connection = new Connection()
        connection.socket_id = socket_id

        if (!user) {
            user = await usersService.create(email)
        } else {
            connection = await connectionsService.findByUserId(user.id)
            if (connection) {
                connection.socket_id = socket_id
            }
        }

        connection.user_id = user.id

        await connectionsService.create(connection)

        await messagesService.create({
            text,
            user_id: user.id
        })

        const allMessages = await messagesService.listByUser(user.id)

        socket.emit("client_list_all_messages", allMessages)

        const allUsers = await connectionsService.findAllWithoutAdmin()
        io.emit("admin_list_all_users", allUsers)
    })

    socket.on("client_send_to_admin", async params => {
        const { text, socket_admin_id } = params

        const socket_id = socket.id

        const { user_id } = await connectionsService.findBySocketId(socket_id)

        const message = await messagesService.create({
            text,
            user_id
        })

        io.to(socket_admin_id).emit("admin_receive_message", {
            message,
            socket_id
        })
    })
})