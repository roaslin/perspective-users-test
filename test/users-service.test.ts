import { v4 as uuidv4 } from 'uuid';
import { describe, expect, test } from '@jest/globals';
import UsersService, { NewUser, User } from '../src/services/UsersService';
import IUsersRepository from '../src/repositories/IUsersRepository';
import UserModel from '../src/models/UserModel';

describe('UsersService should', () => {
    test('return error message when cannot create a new user', async () => {
        const usersRepository: IUsersRepository = {
            store: (newUser: NewUser) => {
                return Promise.resolve('error-persisting-user');
            },
            getAll: () => {
                throw new Error('Function not implemented.');
            },
        };
        const usersService: UsersService = new UsersService(usersRepository);
        const newUser = {
            name: 'Raul Mordillo LLuva',
            email: 'raul.test@test.com',
        };

        const result = await usersService.create(newUser);
        expect(result).toBe('error-persisting-user');
    });

    test('create a new user', async () => {
        const usersRepository: IUsersRepository = {
            store: (newUser: NewUser) => {
                return Promise.resolve({
                    id: '12345',
                    name: 'Raul Mordillo LLuva',
                    email: 'raul.test@test.com',
                    creationDate: new Date(2023, 8, 25),
                });
            },
            getAll: () => {
                throw new Error('Function not implemented.');
            },
        };
        jest.spyOn(usersRepository, 'store');
        const usersService: UsersService = new UsersService(usersRepository);
        const newUser = {
            name: 'Raul Mordillo LLuva',
            email: 'raul.test@test.com',
        };

        await usersService.create(newUser);

        expect(usersRepository.store).toHaveBeenCalledWith(newUser);
    });

    test('return all users ordered by desc by default', async () => {
        const usersRepository: IUsersRepository = {
            getAll: () => {
                return Promise.resolve([
                    buildUser('Karl', 'karl@test.com', new Date(2023, 9, 23)),
                    buildUser('Johannes', 'johannes@test.com', new Date(2023, 9, 24)),
                    buildUser('Raul', 'raul@test.com', new Date(2023, 9, 25)),
                ]);
            },
            store: (newUserCommand: NewUser) => {
                throw new Error('Function not implemented.');
            },
        };
        const usersService = new UsersService(usersRepository);

        const result = await usersService.getAll();

        expect(result[0].name).toBe('Raul');
        expect(result[1].name).toBe('Johannes');
        expect(result[2].name).toBe('Karl');
    });

    test('return all users ordered by asc', async () => {
        const usersRepository: IUsersRepository = {
            getAll: () => {
                return Promise.resolve([
                    buildUser('Karl', 'karl@test.com', new Date(2023, 9, 24)),
                    buildUser('Johannes', 'johannes@test.com', new Date(2023, 9, 23)),
                    buildUser('Raul', 'raul@test.com', new Date(2023, 9, 25)),
                ]);
            },
            store: (newUserCommand: NewUser) => {
                throw new Error('Function not implemented.');
            },
        };
        const usersService = new UsersService(usersRepository);

        const result = await usersService.getAll('asc');

        expect(result[0].name).toBe('Johannes');
        expect(result[1].name).toBe('Karl');
        expect(result[2].name).toBe('Raul');
    });
});

function buildUser(name: string, email: string, date: Date = new Date()): UserModel {
    const id = uuidv4();
    return new UserModel(id, name, email, date);
}
