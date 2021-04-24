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

    })
})