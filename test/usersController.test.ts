import { describe, expect, test } from '@jest/globals';
import supertest from 'supertest';

import app from '../src/app';

const appRequest = supertest(app);

describe('UsersController should', () => {
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
        expect(response.body.created).toBeTruthy();
        expect(response.status).toBe(201);
    });
});
