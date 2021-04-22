import { getCustomRepository, Repository } from "typeorm"
import { User } from "../entities/User"
import { UsersRepository } from "../repositories/UserRepository"

class UsersService {

    private UsersRepository: Repository<User>

    constructor() {
        this.UsersRepository = getCustomRepository(UsersRepository)
    }

    async create(email: string) {
        const userExists = await this.UsersRepository.findOne({ email })
        if (userExists) {
            throw new Error("User already exists!")
        }

        const user = this.UsersRepository.create({ email })

        await this.UsersRepository.save(user)

        return user
    }

    async getAll() {
        const users = await this.UsersRepository.find()

        return users
    }

}

export { UsersService }