import { IUserRepository } from '../interfaces/IUserRepository';
import { IUserService } from '../interfaces/IUserService';

export default class UserService implements IUserService {
    public constructor(private readonly userRepository: IUserRepository) {}
    public teste(): void {
        this.userRepository;
    }
}
