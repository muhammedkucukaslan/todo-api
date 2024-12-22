import { Request, Response } from 'express';
import { handleSuccessResponse, handleErrorResponse } from '../utils/functions';
import { IResponse, IResult } from '../types/global';


interface ITodoService {
    getTodos: (userId: string) => Promise<IResult<Todo[]>>;
    createTodo: (userId: string, title: string) => Promise<IResult>;
    deleteTodo: (id: string) => Promise<IResult>;
    updateTodo: (
        id: string,
        data: {
            title?: string;
            completed?: boolean;
        }
    ) => Promise<IResult>;
}

export class TodoHandler {
    private service: ITodoService;

    constructor(service: ITodoService) {
        this.service = service;
    }

    public async getTodos(
        req: Request,
        res: Response
    ): Promise<IResponse<Todo[]>> {
        try {
            const userId = req.headers['x-user-id'] as string;
            const result = await this.service.getTodos(userId);
            if (!result.success) {
                return handleErrorResponse(
                    res,
                    result.ERR_CODE,
                    result.message
                );
            }
            return handleSuccessResponse<Todo[]>(res, result.data);
        } catch (error) {
            return handleErrorResponse(
                res,
                'SERVER_ERROR',
                'Internal server error'
            );
        }
    }

    public async createTodo(req: Request, res: Response): Promise<IResponse> {
        try {
            const userId = req.headers['x-user-id'] as string;
            const { title } = req.body;
            const result = await this.service.createTodo(userId, title);
            if (!result.success) {
                return handleErrorResponse(
                    res,
                    result.ERR_CODE,
                    result.message
                );
            }
            return handleSuccessResponse(res, null, 201);
        } catch (error) {
            return handleErrorResponse(
                res,
                'SERVER_ERROR',
                'Internal server error'
            );
        }
    }

    public async deleteTodo(req: Request, res: Response): Promise<IResponse> {
        try {
            const id: string = req.params.id;
            const result = await this.service.deleteTodo(id);
            if (!result.success) {
                return handleErrorResponse(
                    res,
                    result.ERR_CODE,
                    result.message
                );
            }
            return handleSuccessResponse(res, null, 204);
        } catch (error) {
            return handleErrorResponse(
                res,
                'SERVER_ERROR',
                'Internal server error'
            );
        }
    }

    public async updateTodo(req: Request, res: Response): Promise<IResponse> {
        try {
            const id = req.params.id;
            const body = req.body;
            const result = await this.service.updateTodo(id, body);
            if (!result.success) {
                return handleErrorResponse(
                    res,
                    result.ERR_CODE,
                    result.message
                );
            }
            return handleSuccessResponse(res, null, 204);
        } catch (error) {
            return handleErrorResponse(
                res,
                'SERVER_ERROR',
                'Internal server error'
            );
        }
    }
}

interface Todo {
    id: number;
    title: string;
    completed: boolean;
    createdAt: string;
}
