import { getCustomRepository } from "typeorm"
import { User } from "../entities/User"
import { UsersRepository } from "../repositories/UserRepository"

class UsersService {
    async create(email: string) {
        const usersRepository = getCustomRepository(UsersRepository)

        const userExists = await usersRepository.findOne({ email })
        if (userExists) {
            throw new Error("User already exists!")
        }

        const user = usersRepository.create({ email })

        await usersRepository.save(user)

        return user
    }

}

export { UsersService }