import { describe, expect, test } from '@jest/globals';
import UsersService, { NewUserCommand, User } from '../src/UsersService';
import UsersRepository from '../src/usersRepository';

describe('UsersService should', () => {
    test('return error message when cannot create a new user', () => {
        const usersRepository: UsersRepository = {
            store(newUserCommand: NewUserCommand): String | User {
                return 'error';
            },
        };
        const usersService: UsersService = new UsersService(usersRepository);
        const newUserCommand = {
            name: 'Raul Mordillo LLuva',
            email: 'raul.test@test.com',
        };

        const result = usersService.create(newUserCommand);
        expect(result).toBe('error');
    });

    test('return a new created user', () => {
        const usersRepository: UsersRepository = {
            store(newUserCommand: NewUserCommand) {
                return {
                    id: '12345',
                    name: 'Raul Mordillo LLuva',
                    email: 'raul.test@test.com',
                    creationDate: '10/10/2023',
                };
            },
        };

        const usersService: UsersService = new UsersService(usersRepository);
        const newUserCommand = {
            name: 'Raul Mordillo LLuva',
            email: 'raul.test@test.com',
        };

        const result = usersService.create(newUserCommand);

        const expectedResult: User = {
            id: '12345',
            name: 'Raul Mordillo LLuva',
            email: 'raul.test@test.com',
            creationDate: '10/10/2023',
        };
        expect(result).toEqual(expectedResult);
    });
});
