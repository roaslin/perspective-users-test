import { describe, expect, test } from '@jest/globals';
import UsersService, { NewUserCommand, User } from '../src/UsersService';
import UsersRepository from '../src/usersRepository';

describe('UsersRepository should', () => {
    test('return "error" when cannot store a new user', async () => {
        const usersRepository: UsersRepository = new UsersRepository();

        const newUserCommand: NewUserCommand = {
            name: 'Raul Mordillo LLuva',
            email: 'raul.test@test.com',
        };

        const result = await usersRepository.store(newUserCommand);
        expect(result).toBe('error');
    });

    test('return a new user when can store a user', async () => {
        const usersRepository: UsersRepository = new UsersRepository();
        const newUserCommand: NewUserCommand = {
            name: 'Raul Mordillo LLuva',
            email: 'raul.test@test.com',
        };

        const result = await usersRepository.store(newUserCommand);

        const expectedNewUSer = {
            id: '12345',
            name: 'Raul Mordillo LLuva',
            email: 'raul.test@test.com',
            creationDate: '10/10/2023',
        };
        expect(result).toEqual(expectedNewUSer);
    });
});
