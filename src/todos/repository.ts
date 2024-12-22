import { createSuccessResult, createErrorResult } from '../utils/functions';
import { IResult } from '../types/global';

interface Database {
    execute: (query: string, params?: any) => Promise<any>;
}

export class TodoRepository {
    private db: Database;

    constructor(dbClient: Database) {
        this.db = dbClient;
    }

    public async getTodos(userId: string): Promise<IResult<Todo[]>> {
        try {
            const todos = await this.db.execute(
                'SELECT * FROM todos WHERE userId = ?',
                [userId]
            );

            const todosList = todos.rows.map((row: any) => {
                return {
                    id: row.id,
                    title: row.title,
                    completed: row.completed === 1,
                    createdAt: row.createdAt,
                } as Todo;
            }) as Todo[];
            return createSuccessResult(todosList);
        } catch (error) {
            return createErrorResult('Error fetching todos', 'SERVER_ERROR');
        }
    }

    public async createTodo(userId: string, title: string): Promise<IResult> {
        try {
            const result = await this.db.execute(
                `INSERT INTO todos (userId,title) VALUES (?,?)`,
                [userId, title]
            );
            if (result.rowsAffected === 0) {
                return createErrorResult('Error creating todo', 'SERVER_ERROR');
            }
            return createSuccessResult(null);
        } catch (error) {
            console.log(error);
            return createErrorResult('Error creating todo', 'SERVER_ERROR');
        }
    }

    public async deleteTodo(id: string): Promise<IResult> {
        try {
            const result = await this.db.execute(
                `DELETE FROM todos WHERE id = ?`,
                [id]
            );
            if (result.rowsAffected === 0) {
                return createErrorResult('Error deleting todo', 'SERVER_ERROR');
            }
            return createSuccessResult(null);
        } catch (error) {
            return createErrorResult('Error deleting todo', 'SERVER_ERROR');
        }
    }

    public async updateTodo(
        id: string,
        title: string,
        completed: boolean
    ): Promise<IResult> {
        try {
            const params = [];
            let sql = 'UPDATE todos SET ';

            if (title !== undefined) {
                sql += 'title = ?, ';
                params.push(title);
            }

            if (completed !== undefined) {
                sql += 'completed = ?, ';
                params.push(completed);
            }

            if (params.length === 0) {
                throw new Error('No fields to update');
            }

            sql = sql.slice(0, -2);
            sql += ' WHERE id = ?';
            params.push(id);

            const result = await this.db.execute(sql, params);
            if (result.rowsAffected === 0) {
                return createErrorResult('Error updating todo', 'SERVER_ERROR');
            }
            return createSuccessResult(null);
        } catch (error) {
            console.log(error);
            return createErrorResult('Error updating todo', 'SERVER_ERROR');
        }
    }
}

interface Todo {
    id: number;
    title: string;
    completed: boolean;
    createdAt: string;
}
