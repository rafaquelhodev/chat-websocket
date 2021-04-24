import { Router } from "express"
import { ConnectionsController } from "./controllers/ConnectionsController"
import { MessagesController } from "./controllers/MessagesController"
import { SettingsController } from "./controllers/SettingsController"
import { UsersController } from "./controllers/UserController"


const routes = Router()

const settingsController = new SettingsController()
routes.post("/settings", settingsController.create)
routes.get("/settings", settingsController.find)
routes.get("/settings/:username", settingsController.findByUserName)
routes.put("/settings/:username", settingsController.update)

const usersController = new UsersController()
routes.post("/users", usersController.create)
routes.get("/users", usersController.getAll)

const messagesController = new MessagesController()
routes.post("/messages", messagesController.create)
routes.get("/messages/:id", messagesController.showByUser)

const connectionsController = new ConnectionsController()
routes.get("/connections", connectionsController.findAll)

export { routes }