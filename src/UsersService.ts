import IUsersRepository from './IUsersRepository';

export interface NewUser {
    name: string;
    email: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    creationDate: Date;
}

export default class UsersService {
    private _usersRepository: IUsersRepository;

    constructor(usersRepository: IUsersRepository) {
        this._usersRepository = usersRepository;
    }

    async create(newUser: NewUser): Promise<string | User> {
        try {
            return await this._usersRepository.store(newUser);
        } catch (error) {
            console.log(error);
            return 'error';
        }
    }

    async getAll(created = 'desc'): Promise<Array<User>> {
        try {
            const result = await this._usersRepository.getAll(created);

            if (created === 'desc') {
                return result.sort(
                    (a: User, b: User) => b.creationDate.getTime() - a.creationDate.getTime(),
                );
            }

            return result.sort(
                (a: User, b: User) => a.creationDate.getTime() - b.creationDate.getTime(),
            );
        } catch (error) {
            console.log(error);
        }
    }
}
