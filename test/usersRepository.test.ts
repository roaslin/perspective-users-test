import { v4 as uuidv4 } from 'uuid';
import { describe, expect, test } from '@jest/globals';
import { NewUser } from '../src/UsersService';
import InMemoryUsersRepository from '../src/InMemoryUsersRepository';
import IUsersRepository from '../src/IUsersRepository';
import IIdProvider from '../src/IIdProvider';
import Clock from '../src/Clock';
import UserModel from '../src/UserModel';
import UUIDV4IdProvider from '../src/UUIDV4IdProvider';

describe('UsersRepository should', () => {
    test('return "error" when cannot store a new user', async () => {
        const clock: Clock = {
            today: (): Date => {
                return new Date(2023, 8, 25);
            },
        };
        const idProvider: IIdProvider = {
            generateId: () => {
                throw Error();
            },
        };
        const usersRepository: IUsersRepository = new InMemoryUsersRepository(idProvider, clock);

        const newUser: NewUser = {
            name: 'Raul Mordillo LLuva',
            email: 'raul.test@test.com',
        };

        const result = await usersRepository.store(newUser);
        expect(result).toBe('error-persisting-user');
    });

    test('return a new user when can persist it', async () => {
        const clock: Clock = {
            today: (): Date => {
                return new Date(2023, 8, 25);
            },
        };
        const idProvider: IIdProvider = {
            generateId: () => {
                return Promise.resolve('12345');
            },
        };
        const usersRepository: InMemoryUsersRepository = new InMemoryUsersRepository(
            idProvider,
            clock,
        );
        const newUser: NewUser = {
            name: 'Raul Mordillo LLuva',
            email: 'raul.test@test.com',
        };

        const result = await usersRepository.store(newUser);

        const expectedNewUSer = {
            id: '12345',
            name: 'Raul Mordillo LLuva',
            email: 'raul.test@test.com',
            creationDate: new Date(2023, 8, 25),
        };
        expect(result).toEqual(expectedNewUSer);
    });

    test('return all users', async () => {
        const clock: Clock = new Clock();
        const idProvider: IIdProvider = new UUIDV4IdProvider();
        const usersRepository: InMemoryUsersRepository = new InMemoryUsersRepository(
            idProvider,
            clock,
        );
        await usersRepository.store(buildUser('Raul', 'raul@test.com'));
        await usersRepository.store(buildUser('Servus', 'servus@test.com'));
        
        const result = await usersRepository.getAll();

        expect(result.length).toBe(2);
    });
});

function buildUser(name: string, email: string): UserModel {
    const id = uuidv4();
    return new UserModel(id, name, email, new Date());
}
