import express, { Express, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import UsersService, { NewUserCommand } from './UsersService';
import UsersRepository from './usersRepository';

dotenv.config();

const app: Express = express();

const usersRepository: UsersRepository = new UsersRepository();
const usersService: UsersService = new UsersService(usersRepository);

app.use(cors()).use(express.json()).options('*', cors());

app.post('/users', async (req: Request, res: Response) => {
    const newUserRequest: NewUserCommand = req.body;
    if (!newUserRequest.name || !newUserRequest.email) {
        res.statusCode = 400;
        return res.send({ message: 'Invalid payload' });
    }

    const result = await usersService.create(newUserRequest);
    res.send({}).status(201);
});
app.get('/users', (req: Request, res: Response) => {
    res.send([]).status(200);
});

const port = process.env.PORT || 3111;
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
