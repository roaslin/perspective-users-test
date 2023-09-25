import UserModel from './UserModel';
import { NewUser, User } from './UsersService';

export default interface IUsersRepository {
    getAll(created: string): Promise<Array<User>>;
    store(newUserCommand: NewUser): Promise<string | User>;
}
