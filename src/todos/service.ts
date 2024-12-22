import { IResult } from '../types/global';
import { createSuccessResult, createErrorResult } from '../utils/functions';

interface IRepository {
    getTodos: (userId: string) => Promise<IResult<Todo[]>>;
    createTodo: (userId: string, title: string) => Promise<IResult>;
    deleteTodo: (id: string) => Promise<IResult>;
    updateTodo: (
        id: string,
        title: string,
        completed: boolean
    ) => Promise<IResult>;
}

export class TodoService {
    private repository: IRepository;

    constructor(todoRepository: IRepository) {
        this.repository = todoRepository;
    }

    public async getTodos(userId: string): Promise<IResult<Todo[]>> {
        try {
            const result = await this.repository.getTodos(userId);
            if (!result.success) {
                return createErrorResult(result.message, result.ERR_CODE);
            }
            return createSuccessResult(result.data);
        } catch (error) {
            return createErrorResult('Internal server error', 'SERVER_ERROR');
        }
    }

    public async createTodo(userId: string, title: string): Promise<IResult> {
        try {
            const result = await this.repository.createTodo(userId, title);
            if (!result.success) {
                return createErrorResult(result.message, result.ERR_CODE);
            }
            return createSuccessResult(result.data);
        } catch (error) {
            return createErrorResult('Internal server error', 'SERVER_ERROR');
        }
    }

    public async updateTodo(
        id: string,
        data: {
            title?: string;
            completed?: boolean;
        }
    ): Promise<IResult> {
        try {
            const result = await this.repository.updateTodo(
                id,
                data.title!,
                data.completed!
            );
            if (!result.success) {
                return createErrorResult(result.message, result.ERR_CODE);
            }
            return createSuccessResult(null);
        } catch (error) {
            return createErrorResult('Internal server error', 'SERVER_ERROR');
        }
    }

    public async deleteTodo(id: string): Promise<IResult> {
        try {
            const result = await this.repository.deleteTodo(id);
            if (!result.success) {
                return createErrorResult(result.message, result.ERR_CODE);
            }
            return createSuccessResult(null);
        } catch (error) {
            return createErrorResult('Internal server error', 'SERVER_ERROR');
        }
    }
}

interface Todo {
    id: number;
    title: string;
    completed: boolean;
    createdAt: string;
}
