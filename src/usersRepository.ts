import { NewUserCommand, User } from "./UsersService";

export default class UsersRepository {
  constructor() {}
    store(newUserCommand: NewUserCommand): String | User  {
      throw new Error('Method not implemented.');
    }

}
