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

    create(newUserCommand: NewUserCommand): String | User {
        return this.usersRepository.store(newUserCommand);
    }
}
