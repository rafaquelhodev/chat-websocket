import { Router } from "express"
import { SettingsController } from "./controllers/SettingsController"
import { UsersController } from "./controllers/UserController"


const routes = Router()

const settingsController = new SettingsController()
routes.post("/settings", settingsController.create)
routes.get("/settings", settingsController.find)

const usersController = new UsersController()
routes.post("/users", usersController.create)

export { routes }