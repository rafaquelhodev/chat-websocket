import { Request, Response } from "express"
import { UsersService } from "../services/UsersService";


class UsersController {
    async create(req: Request, res: Response): Promise<Response> {
        const { email } = req.body

        const usersService = new UsersService();

        try {

            const settings = await usersService.create(email);
            return res.json(settings);

        } catch (error) {

            return res.status(400).json({
                message: error.message
            })
        }

    }
}

export { UsersController }