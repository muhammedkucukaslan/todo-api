import { UserRepository } from '../repository';
import { createSuccessResult, createErrorResult } from '../../utils/functions';
import { IResult } from '../../types/global';

beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
    jest.restoreAllMocks();
});

const mockExecute = jest.fn();
const mockDbClient = {
    execute: mockExecute,
};

describe('UserRepository', () => {
    let userRepository: UserRepository;

    beforeEach(() => {
        userRepository = new UserRepository(mockDbClient);
        mockExecute.mockClear();
    });

    describe('getUser', () => {
        const userId = '1';
        const mockUser = { 
            id: 1, 
            username: 'John', 
            email: 'john@example.com' 
        };

        it('should return a user when user is found', async () => {
            mockExecute.mockResolvedValueOnce({ rows: [mockUser] });

            const result: IResult<any> = await userRepository.getUser(userId);

            expect(mockExecute).toHaveBeenCalledWith(
                'SELECT * FROM users WHERE id = ?', 
                [userId]
            );
            expect(result).toEqual(createSuccessResult(mockUser));
        });

        it('should return an error when user is not found', async () => {
            mockExecute.mockResolvedValueOnce({ rows: [] });

            const result: IResult<any> = await userRepository.getUser(userId);

            expect(mockExecute).toHaveBeenCalledWith(
                'SELECT * FROM users WHERE id = ?', 
                [userId]
            );
            expect(result).toEqual(
                createErrorResult('User not found', 'USER_NOT_FOUND')
            );
        });

        it('should return an error when database fails', async () => {
            mockExecute.mockRejectedValueOnce(new Error('Database error'));

            const result: IResult<any> = await userRepository.getUser(userId);

            expect(mockExecute).toHaveBeenCalledWith(
                'SELECT * FROM users WHERE id = ?', 
                [userId]
            );
            expect(result).toEqual(
                createErrorResult('Error fetching user', 'SERVER_ERROR')
            );
        });
    });

    describe('delete', () => {
        const userId = '1';

        it('should delete a user successfully', async () => {
            mockExecute.mockResolvedValueOnce({ rowsAffected: 1 });

            const result: IResult<any> = await userRepository.delete(userId);

            expect(mockExecute).toHaveBeenCalledWith(
                'DELETE FROM users WHERE id = ?', 
                [userId]
            );
            expect(result).toEqual(createSuccessResult(null));
        });

        it('should return an error when no rows are affected', async () => {
            mockExecute.mockResolvedValueOnce({ rowsAffected: 0 });

            const result: IResult<any> = await userRepository.delete(userId);

            expect(mockExecute).toHaveBeenCalledWith(
                'DELETE FROM users WHERE id = ?', 
                [userId]
            );
            expect(result).toEqual(
                createErrorResult('Error deleting user', 'SERVER_ERROR')
            );
        });

        it('should return an error when database fails', async () => {
            mockExecute.mockRejectedValueOnce(new Error('Database error'));

            const result: IResult<any> = await userRepository.delete(userId);

            expect(mockExecute).toHaveBeenCalledWith(
                'DELETE FROM users WHERE id = ?', 
                [userId]
            );
            expect(result).toEqual(
                createErrorResult('Error deleting user', 'SERVER_ERROR')
            );
        });
    });

    describe('updateUser', () => {
        const userId = '1';
        const newUsername = 'NewUsername';

        it('should update the user successfully', async () => {
            mockExecute.mockResolvedValueOnce({ rowsAffected: 1 });

            const result: IResult<any> = await userRepository.updateUser(
                userId, 
                newUsername
            );

            expect(mockExecute).toHaveBeenCalledWith(
                'UPDATE users SET username = ? WHERE id = ?', 
                [newUsername, userId]
            );
            expect(result).toEqual(createSuccessResult(null));
        });

        it('should return an error when no rows are affected', async () => {
            mockExecute.mockResolvedValueOnce({ rowsAffected: 0 });

            const result: IResult<any> = await userRepository.updateUser(
                userId, 
                newUsername
            );

            expect(mockExecute).toHaveBeenCalledWith(
                'UPDATE users SET username = ? WHERE id = ?', 
                [newUsername, userId]
            );
            expect(result).toEqual(
                createErrorResult('Error updating user', 'SERVER_ERROR')
            );
        });

        it('should return an error when database fails', async () => {
            mockExecute.mockRejectedValueOnce(new Error('Database error'));

            const result: IResult<any> = await userRepository.updateUser(
                userId, 
                newUsername
            );

            expect(mockExecute).toHaveBeenCalledWith(
                'UPDATE users SET username = ? WHERE id = ?', 
                [newUsername, userId]
            );
            expect(result).toEqual(
                createErrorResult('Error updating user', 'SERVER_ERROR')
            );
        });
    });
});