import { User } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';

export class UserService {

    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async getUsers() {
        return await this.userRepository.getUsers();
    }

    async createUser(user: User) {
        return await this.userRepository.createUser(user);
    }

    async updateUser(user: User) {
        return await this.userRepository.updateUser(user);
    }

    async deleteUser(userId: Number) {
        return await this.userRepository.deleteUser(userId);
    }

}