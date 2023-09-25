import Clock from './Clock';
import IIdProvider from './IIdProvider';
import IUsersRepository from './IUsersRepository';
import UserModel from './UserModel';
import { NewUser, User } from './UsersService';

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
            console.log(error);
            return 'error-persisting-user';
        }
    }
}
