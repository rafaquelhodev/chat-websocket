import { ConnectionsService } from "../services/ConnectionsService";
import { Request, Response } from "express"

class ConnectionsController {

    async findAll(req: Request, res: Response) {
        const connectionsService = new ConnectionsService();

        const list = await connectionsService.getAll()

        return res.json(list)
    }
}

export { ConnectionsController }