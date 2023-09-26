import Clock from '../../shared/Clock';
import IIdProvider from '../../providers/IIdProvider';
import IUsersRepository from '../IUsersRepository';
import UserModel from '../../models/UserModel';
import { Email, NewUser, User } from '../../services/UsersService';

export default class InMemoryUsersRepository implements IUsersRepository {
    private idProvider: IIdProvider;
    private clock: Clock;
    private users: Array<UserModel>;

    constructor(idProvider: IIdProvider, clock: Clock) {
        this.idProvider = idProvider;
        this.clock = clock;
        this.users = [];
    }

    async store(newUser: NewUser): Promise<string | User> {
        try {
            const id = await this.idProvider.generateId();
            const today = this.clock.today();
            const newUserModel = new UserModel(id, newUser.name, newUser.email, today);

            this.users.push(newUserModel);

            return {
                id: newUserModel.id,
                name: newUserModel.name,
                email: newUserModel.email,
                creationDate: newUserModel.creationDate,
            };
        } catch (error) {
            console.error(error);
            return 'error-persisting-user';
        }
    }

    async getAll(): Promise<Array<User>> {
        try {
            const mappedUsers = this.users.slice().map((userModel) => {
                return {
                    id: userModel.id,
                    name: userModel.name,
                    email: userModel.email,
                    creationDate: userModel.creationDate,
                };
            });
            return mappedUsers;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async findByEmail(email: Email): Promise<Boolean> {
        try {
            return this.users.findIndex((user) => user.email === email) > -1;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
