import { NewUserCommand, User } from './UsersService';

export default class UsersRepository {
    constructor() {}
    store(newUserCommand: NewUserCommand): String | User {
        return 'error';
    }
}
