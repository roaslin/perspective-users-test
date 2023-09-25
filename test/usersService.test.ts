import { describe, expect, test } from '@jest/globals';
import UsersService, { NewUser, User } from '../src/UsersService';
import IUsersRepository from '../src/IUsersRepository';

describe('UsersService should', () => {
    test('return error message when cannot create a new user', async () => {
        const usersRepository: IUsersRepository = {
            store: (newUser: NewUser) => {
                return Promise.resolve('error-persisting-user');
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

    test('return a new created user', async () => {
        const usersRepository: IUsersRepository = {
            store: (newUser: NewUser) => {
                return Promise.resolve({
                    id: '12345',
                    name: 'Raul Mordillo LLuva',
                    email: 'raul.test@test.com',
                    creationDate: new Date(2023, 8, 25),
                });
            },
        };

        const usersService: UsersService = new UsersService(usersRepository);
        const newUser = {
            name: 'Raul Mordillo LLuva',
            email: 'raul.test@test.com',
        };

        const result = await usersService.create(newUser);

        const expectedResult: User = {
            id: '12345',
            name: 'Raul Mordillo LLuva',
            email: 'raul.test@test.com',
            creationDate: new Date(2023, 8, 25),
        };
        expect(result).toEqual(expectedResult);
    });
});
