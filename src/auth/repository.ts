import { IResult } from '../types/global';
import { createSuccessResult, createErrorResult } from '../utils/functions';

interface Database {
    execute: (query: string, params?: any) => Promise<any>;
}

export class AuthRepository {
    private db: Database;

    constructor(dbClient: Database) {
        this.db = dbClient;
    }

    public async isEmailValid(email: string): Promise<IResult> {
        try {
            const result = await this.db.execute(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );
            if (result.rows.length > 0) {
                return createErrorResult(
                    'Email already exists',
                    'EMAIL_EXISTS'
                );
            }
            return createSuccessResult(null);
        } catch (error) {
            console.log(error);
            return createErrorResult('Error checking email', 'SERVER_ERROR');
        }
    }

    public async signup(
        username: string,
        email: string,
        password: string
    ): Promise<IResult> {
        try {
            const result = await this.db.execute(
                `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
                [username, email, password]
            );
            console.log(result);
            if (result.rowsAffected === 0) {
                return createErrorResult('Error signing up', 'SERVER_ERROR');
            }
            return createSuccessResult(null);
        } catch (error) {
            console.log(error);
            return createErrorResult('Error signing up', 'SERVER_ERROR');
        }
    }

    public async getPasswordAndId(
        email: string
    ): Promise<IResult<{ password: string; id: string }>> {
        try {
            const result = await this.db.execute(
                'SELECT id, password FROM users WHERE email = ?',
                [email]
            );
            if (result.rows.length === 0) {
                return createErrorResult('Invalid email', 'INVALID_EMAIL');
            }
            return createSuccessResult({
                id: result.rows[0].id,
                password: result.rows[0].password,
            });
        } catch (error) {
            return createErrorResult('Error logging in', 'SERVER_ERROR');
        }
    }

    public async getUserId(email: string): Promise<IResult<{ id: string }>> {
        try {
            const result = await this.db.execute(
                'SELECT id FROM users WHERE email = ?',
                [email]
            );
            if (result.rows.length === 0) {
                return createErrorResult('Invalid email', 'INVALID_EMAIL');
            }
            return createSuccessResult({ id: result.rows[0].id });
        } catch (error) {
            return createErrorResult('Error logging in', 'SERVER_ERROR');
        }
    }
}
