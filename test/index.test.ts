import { describe, expect, test } from '@jest/globals';
import supertest from 'supertest';

import app from '../src';

const appRequest = supertest(app);

describe('POST /users should', () => {
    test('return 400 when payload is invalid', async () => {
        const newUserRequest = {
            name: 'Raul Mordillo Lluva',
        };
        const response = await appRequest.post('/users').send(newUserRequest);

        expect(response.body.message).toBe('Invalid payload');
        expect(response.status).toBe(400);
    });

    test('return 201 when a new user is created', async () => {
        const newUserRequest = {
            name: 'Raul Mordillo Lluva',
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
    test('return all users by default ordering desc', async () => {
        const newUserRequest = {
            name: 'Servus',
            email: 'servus.test@test.com',
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

        expect(response.body.users.length).toBe(4);
        expect(response.body.users[0].name).toBe('Donald Duck');
        expect(response.body.users[1].name).toBe('Pepe Gotera');
        expect(response.body.users[2].name).toBe('Servus');
        expect(response.body.users[3].name).toBe('Raul Mordillo Lluva');

        expect(response.status).toBe(200);
    });

    test('return all users by default ordering asc', async () => {
        const response = await appRequest.get('/users?created=asc');

        expect(response.body.users.length).toBe(4);
        expect(response.body.users[0].name).toBe('Raul Mordillo Lluva');
        expect(response.body.users[1].name).toBe('Servus');
        expect(response.body.users[2].name).toBe('Pepe Gotera');
        expect(response.body.users[3].name).toBe('Donald Duck');

        expect(response.status).toBe(200);
    });
});
