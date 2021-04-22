import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingsCreate {
    chat: boolean;
    username: string
}

class SettingsService {

    private SettingsRepository: Repository<Setting>
    constructor() {
        this.SettingsRepository = getCustomRepository(SettingsRepository)
    }

    async create({ chat, username }: ISettingsCreate) {
        const userAlreadyExists = await this.SettingsRepository.findOne({ username });
        if (userAlreadyExists) {
            throw new Error("User already exists!");
        }

        const settings = this.SettingsRepository.create({
            chat,
            username
        })

        await this.SettingsRepository.save(settings);

        return settings;
    }

    async getAllSettings() {
        const settings = await this.SettingsRepository.find()

        return settings;
    }
}

export { SettingsService }