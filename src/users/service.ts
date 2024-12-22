import { IResult } from '../types/global';
import { createSuccessResult, createErrorResult } from '../utils/functions';

interface IUserRepository {
    getUser: (id: string) => Promise<IResult<User>>;
    delete: (id: string) => Promise<IResult>;
    updateUser: (id: string, username: string) => Promise<IResult>;
}

export class UserService {
    private repository: IUserRepository;

    constructor(repository: IUserRepository) {
        this.repository = repository;
    }

    public async getUser(id: string): Promise<IResult<User>> {
        try {
            const result = await this.repository.getUser(id);
            if (!result.success) {
                return createErrorResult(result.message, result.ERR_CODE);
            }
            return createSuccessResult(result.data);
        } catch (error) {
            return createErrorResult('Internal server error', 'SERVER_ERROR');
        }
    }

    public async deleteUser(id: string): Promise<IResult> {
        try {
            const result = await this.repository.delete(id);
            if (!result.success) {
                return createErrorResult(result.message, result.ERR_CODE);
            }
            return createSuccessResult(null);
        } catch (error) {
            return createErrorResult('Internal server error', 'SERVER_ERROR');
        }
    }

    public async updateUser(id: string, username: string): Promise<IResult> {
        try {
            const result = await this.repository.updateUser(id, username);
            if (!result.success) {
                return createErrorResult(result.message, result.ERR_CODE);
            }
            return createSuccessResult(null);
        } catch (error) {
            return createErrorResult('Internal server error', 'SERVER_ERROR');
        }
    }
}

type User = {
    id: number;
    username: string;
    email: string;
};
