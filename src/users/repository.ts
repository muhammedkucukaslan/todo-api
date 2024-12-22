import { IResult } from '../types/global';
import { createSuccessResult, createErrorResult } from '../utils/functions';

interface Database {
    execute: (query: string, params?: any) => Promise<any>;
}

export class UserRepository {
    private db: Database;

    constructor(dbClient: Database) {
        this.db = dbClient;
    }

    public async getUser(id: string): Promise<IResult<User>> {
        try {
            const query = `SELECT * FROM users WHERE id = ?`;
            const result = await this.db.execute(query, [id]);
            if (result.rows.length === 0) {
                return createErrorResult('User not found', 'USER_NOT_FOUND');
            }
            const user = result.rows[0];
            return createSuccessResult({
                id: user.id,
                username: user.username,
                email: user.email,
            });
        } catch (error) {
            console.error('error', error);
            return createErrorResult('Error fetching user', 'SERVER_ERROR');
        }
    }

    public async delete(id: string): Promise<IResult> {
        try {
            const result = await this.db.execute(
                `DELETE FROM users WHERE id = ?`,
                [id]
            );
            if (result.rowsAffected === 0) {
                return createErrorResult('Error deleting user', 'SERVER_ERROR');
            }
            return createSuccessResult(null);
        } catch (error) {
            console.error('error', error);
            return createErrorResult('Error deleting user', 'SERVER_ERROR');
        }
    }

    public async updateUser(id: string, username: string): Promise<IResult> {
        try {
            const result = await this.db.execute(
                `UPDATE users SET username = ? WHERE id = ?`,
                [username, id]
            );
            if (result.rowsAffected === 0) {
                return createErrorResult('Error updating user', 'SERVER_ERROR');
            }
            return createSuccessResult(null);
        } catch (error) {
            return createErrorResult('Error updating user', 'SERVER_ERROR');
        }
    }
}

type User = {
    id: number;
    username: string;
    email: string;
};
