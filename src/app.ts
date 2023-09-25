import express, { Express, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import UsersService, { NewUser } from './UsersService';
import InMemoryUsersRepository from './InMemoryUsersRepository';
import IUsersRepository from './IUsersRepository';
import IIdProvider from './IIdProvider';
import UUIDV4IdProvider from './UUIDV4IdProvider';
import Clock from './Clock';

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

app.post('/users', async (req: Request, res: Response) => {
    const newUser: NewUser = req.body;
    if (!newUser.name || !newUser.email) {
        res.statusCode = 400;
        return res.send({ message: 'Invalid payload' });
    }

    const result = await usersService.create(newUser);
    if (typeof result === 'string') {
        res.send({ message: result }).status(200);
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
});
app.get('/users', async (req: Request, res: Response) => {

    const result = await usersService.getAll();



    res.send([]).status(200);
});

const port = process.env.PORT || 3111;
const server = app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
