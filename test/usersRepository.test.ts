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
});
