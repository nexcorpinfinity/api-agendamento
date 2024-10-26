import { IUserEntity } from '../interfaces/IUserEntity';

class UserRepository {
    public constructor(private readonly userEntity: IUserEntity) {}

    public teste(): void {
        this.userEntity;
    }
}
export { UserRepository };
