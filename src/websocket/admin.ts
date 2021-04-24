import { io } from "../http"
import { ConnectionsService } from "../services/ConnectionsService"
import { MessagesService } from "../services/MessagesService"

io.on("connect", async (socket) => {
    const connectionsService = new ConnectionsService()
    const messagesService = new MessagesService()

    const allConnectionWithoutAdmin = await connectionsService.findAllWithoutAdmin()

    io.emit("admin_list_all_users", allConnectionWithoutAdmin)

    socket.on("admin_list_messages_by_user", async (params, callback) => {
        const { user_id } = params

        const allMessages = await messagesService.listByUser(user_id)

        callback(allMessages)
    })

    socket.on("admin_send_message", async params => {
        const { text, user_id } = params

        await messagesService.create({
            text,
            user_id,
            admin_id: socket.id
        })

        const userConnection = await connectionsService.findByUserId(user_id)
        const userSocketId = userConnection.socket_id

        io.to(userSocketId).emit("admin_send_to_client", {
            text,
            socket_id: socket.id
        })
    })

    socket.on("admin_user_in_support", async params => {
        const { user_id } = params
        await connectionsService.updateAdminId(user_id, socket.id)

        const allConnectionWithoutAdmin = await connectionsService.findAllWithoutAdmin()

        //TODO correct this bug
        // io.emit("admin_list_all_users", allConnectionWithoutAdmin)
    })
})