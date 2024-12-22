import express from 'express';
import middleware from './middleware';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import timeout from 'connect-timeout';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { turso } from './config/db';
import { AuthRepository, AuthService, AuthHandler, AuthRouter } from './auth';
import { TodoRepository, TodoService, TodoHandler, TodoRouter } from './todos';
import { UserRepository, UserService, UserHandler, UserRouter } from './users';

const app = express();

app.use(cookieParser());
app.use(middleware);
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(timeout('5s'));
app.use(
    rateLimit({
        windowMs: 60 * 1000,
        max: 100,
    })
);

const authRepository = new AuthRepository(turso);
const authService = new AuthService(authRepository);
const authHandler = new AuthHandler(authService);
const authRouter = new AuthRouter(authHandler);

const userRepository = new UserRepository(turso);
const userService = new UserService(userRepository);
const userHandler = new UserHandler(userService);
const userRouter = new UserRouter(userHandler);

const todoRepository = new TodoRepository(turso);
const todoService = new TodoService(todoRepository);
const todoHandler = new TodoHandler(todoService);
const todoRouter = new TodoRouter(todoHandler);

app.use('/api/todos', todoRouter.getRouter());
app.use('/api/users', userRouter.getRouter());
app.use('/api', authRouter.getRouter());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
