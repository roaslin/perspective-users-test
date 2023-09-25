import { describe, expect, test } from '@jest/globals';
import supertest from 'supertest';

import app from '../src/app';

const appRequest = supertest(app);

describe('POST /users should', () => {
    test('return 400 when payload is invalid', async () => {
        const newUserRequest = {
            name: 'Raul Mordillo LLuva',
        };
        const response = await appRequest.post('/users').send(newUserRequest);

        expect(response.body.message).toBe('Invalid payload');
        expect(response.status).toBe(400);
    });

    test('return 201 when a new user is created', async () => {
        const newUserRequest = {
            name: 'Raul Mordillo LLuva',
            email: 'raul.test@test.com',
        };
        const response = await appRequest.post('/users').send(newUserRequest);
        expect(response.body.id).toBeTruthy();
        expect(response.body.name).toBe(newUserRequest.name);
        expect(response.body.email).toBe(newUserRequest.email);
        expect(response.body.creationDate).toBeTruthy();
        expect(response.status).toBe(201);
    });
});

describe('GET /users should', () => {
    test('return all users', async () => {

        const newUserRequest = {
            name: 'Raul Mordillo LLuva',
            email: 'raul.test@test.com',
        };

        const newUserRequestTwo = {
            name: 'Pepe Gotera',
            email: 'pepe.gotera@test.com',
        };

        const newUserRequestThree = {
            name: 'Donald Duck',
            email: 'donald.duck@test.com',
        };
        await appRequest.post('/users').send(newUserRequest);
        await appRequest.post('/users').send(newUserRequestTwo);
        await appRequest.post('/users').send(newUserRequestThree);

        const response = await appRequest.get('/users');

        expect(response.body.users.size).toBe(3);
        expect(response.status).toBe(200);
    });
});
