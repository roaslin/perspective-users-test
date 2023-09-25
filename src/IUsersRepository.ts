import { NewUser, User } from './UsersService';

export default interface IUsersRepository {
    store(newUserCommand: NewUser): Promise<string | User>;
}
