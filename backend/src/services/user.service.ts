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

    async getUserByEmail(uid: string, email: string) {
        return await this.userRepository.getUserByEmail(uid, email);
    }


    async registerUser(uid : string, email : string, name: string) {
        return await this.userRepository.registerUser(uid, email, name);
    }

    async updateUser(user: User) {
        return await this.userRepository.updateUser(user);
    }

    async deleteUser(userId: number) {
        return await this.userRepository.deleteUser(userId);
    }

}