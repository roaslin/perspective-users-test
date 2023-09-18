import UsersRepository from './usersRepository';

export interface NewUserCommand {
    name: String;
    email: String;
}

export interface User {
    id: String;
    name: String;
    email: String;
    creationDate: String;
}

export default class UsersService {
    usersRepository: UsersRepository;
    constructor(usersRepository: UsersRepository) {
        this.usersRepository = usersRepository;
    }

    async create(newUserCommand: NewUserCommand): Promise<String | User> {
        return this.usersRepository.store(newUserCommand);
    }
}
