import { Email, NewUser, User } from '../services/UsersService';

export default interface IUsersRepository {
    store(newUserCommand: NewUser): Promise<User>;
    getAll(): Promise<Array<User>>;
    findByEmail(email: Email): Promise<Boolean>;
}
