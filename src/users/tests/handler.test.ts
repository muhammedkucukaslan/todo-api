import { Request, Response } from 'express';
import { UserHandler } from '../handler';
import { createSuccessResult, createErrorResult } from '../../utils/functions';

describe('UserHandler', () => {
    let mockService: any;
    let handler: UserHandler;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockJson: jest.Mock;
    let mockStatus: jest.Mock;

    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});

        mockJson = jest.fn().mockReturnThis();
        mockStatus = jest.fn().mockReturnThis();
        mockResponse = {
            json: mockJson,
            status: mockStatus,
        };

        mockService = {
            getUser: jest.fn(),
            deleteUser: jest.fn(),
            updateUser: jest.fn(),
        };

        handler = new UserHandler(mockService);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('getUser', () => {
        const userId = '1';
        const mockUser = {
            id: 1,
            username: 'testUser',
            email: 'test@example.com'
        };

        beforeEach(() => {
            mockRequest = {
                headers: { 'x-user-id': userId }
            };
        });

        it('should return user when service call succeeds', async () => {
            mockService.getUser.mockResolvedValue(createSuccessResult(mockUser));

            await handler.getUser(mockRequest as Request, mockResponse as Response);

            expect(mockService.getUser).toHaveBeenCalledWith(userId);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(mockUser);
        });

        it('should handle service errors', async () => {
            const error = createErrorResult('User not found', 'USER_NOT_FOUND');
            mockService.getUser.mockResolvedValue(error);

            await handler.getUser(mockRequest as Request, mockResponse as Response);

            expect(mockService.getUser).toHaveBeenCalledWith(userId);
            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({
                ERR_CODE: 'USER_NOT_FOUND',
                message: 'User not found'
            });
        });

        it('should handle unexpected errors', async () => {
            mockService.getUser.mockRejectedValue(new Error('Unexpected error'));

            await handler.getUser(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(500);
            expect(mockJson).toHaveBeenCalledWith({
                ERR_CODE: 'SERVER_ERROR',
                message: 'Internal server error'
            });
        });
    });

    describe('delete', () => {
        const userId = '1';

        beforeEach(() => {
            mockRequest = {
                headers: { 'x-user-id': userId }
            };
        });

        it('should return 204 when service call succeeds', async () => {
            mockService.deleteUser.mockResolvedValue(createSuccessResult(null));

            await handler.delete(mockRequest as Request, mockResponse as Response);

            expect(mockService.deleteUser).toHaveBeenCalledWith(userId);
            expect(mockStatus).toHaveBeenCalledWith(204);
            expect(mockJson).toHaveBeenCalledWith(null);
        });

        it('should handle service errors', async () => {
            const error = createErrorResult('Delete failed', 'DELETE_ERROR');
            mockService.deleteUser.mockResolvedValue(error);

            await handler.delete(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(500);
            expect(mockJson).toHaveBeenCalledWith({
                ERR_CODE: 'DELETE_ERROR',
                message: 'Delete failed'
            });
        });

        it('should handle unexpected errors', async () => {
            mockService.deleteUser.mockRejectedValue(new Error('Unexpected error'));

            await handler.delete(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(500);
            expect(mockJson).toHaveBeenCalledWith({
                ERR_CODE: 'SERVER_ERROR',
                message: 'Internal server error'
            });
        });
    });

    describe('update', () => {
        const userId = '1';
        const username = 'newUsername';

        beforeEach(() => {
            mockRequest = {
                headers: { 'x-user-id': userId },
                body: { username }
            };
        });

        it('should return 204 when service call succeeds', async () => {
            mockService.updateUser.mockResolvedValue(createSuccessResult(null));

            await handler.update(mockRequest as Request, mockResponse as Response);

            expect(mockService.updateUser).toHaveBeenCalledWith(userId, username);
            expect(mockStatus).toHaveBeenCalledWith(204);
            expect(mockJson).toHaveBeenCalledWith(null);
        });

        it('should handle service errors', async () => {
            const error = createErrorResult('Update failed', 'UPDATE_ERROR');
            mockService.updateUser.mockResolvedValue(error);

            await handler.update(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(500);
            expect(mockJson).toHaveBeenCalledWith({
                ERR_CODE: 'UPDATE_ERROR',
                message: 'Update failed'
            });
        });

        it('should handle unexpected errors', async () => {
            mockService.updateUser.mockRejectedValue(new Error('Unexpected error'));

            await handler.update(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(500);
            expect(mockJson).toHaveBeenCalledWith({
                ERR_CODE: 'SERVER_ERROR',
                message: 'Internal server error'
            });
        });
    });
});