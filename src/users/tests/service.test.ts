import { UserService } from '../service';
import { createSuccessResult, createErrorResult } from '../../utils/functions';

const mockGetUser = jest.fn();
const mockDelete = jest.fn();
const mockUpdateUser = jest.fn();

const mockRepository = {
    getUser: mockGetUser,
    delete: mockDelete,
    updateUser: mockUpdateUser
};

describe('UserService', () => {
    let userService: UserService;

    beforeEach(() => {
        userService = new UserService(mockRepository);
        jest.clearAllMocks();
    });

    describe('getUser', () => {
        const userId = '1';
        const mockUser = {
            id: 1,
            username: 'testUser',
            email: 'test@example.com'
        };

        it('should return user when repository call succeeds', async () => {
            mockGetUser.mockResolvedValue(createSuccessResult(mockUser));

            const result = await userService.getUser(userId);

            expect(mockGetUser).toHaveBeenCalledWith(userId);
            expect(result).toEqual(createSuccessResult(mockUser));
        });

        it('should return error when repository returns error', async () => {
            const error = createErrorResult('User not found', 'USER_NOT_FOUND');
            mockGetUser.mockResolvedValue(error);

            const result = await userService.getUser(userId);

            expect(mockGetUser).toHaveBeenCalledWith(userId);
            expect(result).toEqual(error);
        });

        it('should return server error when repository throws', async () => {
            mockGetUser.mockRejectedValue(new Error('Database error'));

            const result = await userService.getUser(userId);

            expect(mockGetUser).toHaveBeenCalledWith(userId);
            expect(result).toEqual(createErrorResult('Internal server error', 'SERVER_ERROR'));
        });
    });

    describe('deleteUser', () => {
        const userId = '1';

        it('should return success when repository call succeeds', async () => {
            mockDelete.mockResolvedValue(createSuccessResult(null));

            const result = await userService.deleteUser(userId);

            expect(mockDelete).toHaveBeenCalledWith(userId);
            expect(result).toEqual(createSuccessResult(null));
        });

        it('should return error when repository returns error', async () => {
            const error = createErrorResult('Delete failed', 'DELETE_ERROR');
            mockDelete.mockResolvedValue(error);

            const result = await userService.deleteUser(userId);

            expect(mockDelete).toHaveBeenCalledWith(userId);
            expect(result).toEqual(error);
        });

        it('should return server error when repository throws', async () => {
            mockDelete.mockRejectedValue(new Error('Database error'));

            const result = await userService.deleteUser(userId);

            expect(mockDelete).toHaveBeenCalledWith(userId);
            expect(result).toEqual(createErrorResult('Internal server error', 'SERVER_ERROR'));
        });
    });

    describe('updateUser', () => {
        const userId = '1';
        const username = 'newUsername';

        it('should return success when repository call succeeds', async () => {
            mockUpdateUser.mockResolvedValue(createSuccessResult(null));

            const result = await userService.updateUser(userId, username);

            expect(mockUpdateUser).toHaveBeenCalledWith(userId, username);
            expect(result).toEqual(createSuccessResult(null));
        });

        it('should return error when repository returns error', async () => {
            const error = createErrorResult('Update failed', 'UPDATE_ERROR');
            mockUpdateUser.mockResolvedValue(error);

            const result = await userService.updateUser(userId, username);

            expect(mockUpdateUser).toHaveBeenCalledWith(userId, username);
            expect(result).toEqual(error);
        });

        it('should return server error when repository throws', async () => {
            mockUpdateUser.mockRejectedValue(new Error('Database error'));

            const result = await userService.updateUser(userId, username);

            expect(mockUpdateUser).toHaveBeenCalledWith(userId, username);
            expect(result).toEqual(createErrorResult('Internal server error', 'SERVER_ERROR'));
        });
    });
});