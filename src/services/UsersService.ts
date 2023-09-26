import IUsersRepository from '../repositories/IUsersRepository';

export type Id = string;
export type Name = string;
export type Email = string;
export type CreatedSorting = 'desc' | ' asc';

export interface NewUser {
    name: Name;
    email: Email;
}

export interface User {
    id: Id;
    name: Name;
    email: Email;
    creationDate: Date;
}

export default class UsersService {
    private _usersRepository: IUsersRepository;

    constructor(usersRepository: IUsersRepository) {
        this._usersRepository = usersRepository;
    }

    async create(newUser: NewUser): Promise<string | User> {
        try {
            const userExists = await this._usersRepository.findByEmail(newUser.email);
            if (userExists) {
                return 'email-already-exists';
            }

            return await this._usersRepository.store(newUser);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getAll(created: CreatedSorting = 'desc'): Promise<Array<User>> {
        try {
            const result = await this._usersRepository.getAll();

            if (created === 'desc') {
                // sorting by descending date
                return result.sort(
                    (a: User, b: User) => b.creationDate.getTime() - a.creationDate.getTime(),
                );
            }

            // sorting by ascending date
            return result.sort(
                (a: User, b: User) => a.creationDate.getTime() - b.creationDate.getTime(),
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
