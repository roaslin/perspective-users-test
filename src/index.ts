import express, { Express, NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import UsersService, { CreatedSorting, NewUser } from './services/UsersService';
import InMemoryUsersRepository from './repositories/in-memory/InMemoryUsersRepository';
import IUsersRepository from './repositories/IUsersRepository';
import IIdProvider from './providers/IIdProvider';
import Clock from './shared/Clock';
import UUIDV4IdProvider from './providers/UUIDV4IdProvider';

dotenv.config();

const app: Express = express();
const idProvider: IIdProvider = new UUIDV4IdProvider();
const clock: Clock = new Clock();
const usersRepository: IUsersRepository = new InMemoryUsersRepository(idProvider, clock);
const usersService: UsersService = new UsersService(usersRepository);

interface NewUserDTO {
    id: string;
    name: string;
    email: string;
    creationDate: Date;
}

app.use(cors()).use(express.json()).options('*', cors());

app.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    const name = req.body.name;
    const email = req.body.email;

    // simple validation, we could use schema validation for more complex data structures
    if (!name || !email) {
        res.statusCode = 400;
        return res.send({ message: 'Invalid payload' });
    }

    try {
        const newUser: NewUser = { name, email };
        const result = await usersService.create(newUser);

        if (typeof result === 'string') {
            if (result === 'error-persisting-user') {
                res.statusCode = 500;
                return res.send({ message: 'Unexpected internal server error occurred.' });
            }
            if (result === 'email-already-exists') {
                res.statusCode = 200;
                return res.send({ message: 'Email already exists' });
            }
        } else {
            const dto: NewUserDTO = {
                id: result.id,
                name: result.name,
                email: result.email,
                creationDate: result.creationDate,
            };

            res.statusCode = 201;
            return res.send(dto);
        }
    } catch (error) {
        next(error);
    }
});

app.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const created = req.query.created as CreatedSorting;
    try {
        const result = await usersService.getAll(created);

        const dtos = result.map((user) => {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                creationDate: user.creationDate,
            };
        });

        res.send({ users: dtos }).status(200);
    } catch (error) {
        next(error);
    }
});

// ports
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const port = PORT || 3111;
const host = HOST || 'localhost';

app.listen(port, () => {
    console.log(`[server]: Server is running at http://${host}:${port}`);
});

export default app;
