import { Router, Request, Response } from 'express';
import { IResponse } from '../types/global';
import { validateRequest } from '../utils/middleware';
import { createValidation, updateValidation } from './utils/validation';

interface ITodoHandler {
    getTodos: (req: Request, res: Response) => Promise<IResponse<Todo[]>>;

    createTodo: (req: Request, res: Response) => Promise<IResponse>;

    deleteTodo: (req: Request, res: Response) => Promise<IResponse>;

    updateTodo: (req: Request, res: Response) => Promise<IResponse>;
}
export class TodoRouter {
    constructor(private handler: ITodoHandler) {
        this.getTodos = this.getTodos.bind(this);
        this.createTodo = this.createTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
    }

    public getRouter() {
        const router = Router();
        router.get('/', this.getTodos);
        router.post('/',createValidation  , validateRequest, this.createTodo);
        router.delete('/:id', this.deleteTodo);
        router.put('/:id', updateValidation ,validateRequest, this.updateTodo);
        return router;
    }

    private async getTodos(req: Request, res: Response) {
        await this.handler.getTodos(req, res);
    }

    private async createTodo(req: Request, res: Response) {
        await this.handler.createTodo(req, res);
    }

    private async deleteTodo(req: Request, res: Response) {
        await this.handler.deleteTodo(req, res);
    }

    private async updateTodo(req: Request, res: Response) {
        await this.handler.updateTodo(req, res);
    }
}

interface Todo {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
    createdAt: string;
}
