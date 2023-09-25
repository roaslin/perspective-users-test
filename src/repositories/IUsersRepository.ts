import { NewUser, User } from '../services/UsersService';

export default interface IUsersRepository {
    store(newUserCommand: NewUser): Promise<string | User>;
    getAll(): Promise<Array<User>>;
}
