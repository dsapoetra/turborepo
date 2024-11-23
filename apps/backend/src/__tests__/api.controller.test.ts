import { fetchUserData, updateUserData } from '../controller/api';
import { fetchUser, updateUser } from '../repository/userCollection';
import { Request, Response } from 'express';

// Mock the repository functions
jest.mock('../repository/userCollection', () => ({
  fetchUser: jest.fn(),
  updateUser: jest.fn(),
}));

const mockFetchUser = fetchUser as jest.Mock;
const mockUpdateUser = updateUser as jest.Mock;

describe('API Controller Tests', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    // Mock response methods
    jsonMock = jest.fn();
    statusMock = jest.fn(() => res as Response);
    res = {
      json: jsonMock,
      status: statusMock,
    };
    req = {}; // Reset request for each test
  });

  describe('fetchUserData', () => {
    it('should return user data when user exists', async () => {
      req.params = { id: '1' };
      mockFetchUser.mockResolvedValue({ id: '1', name: 'John Doe' });

      await fetchUserData(req as Request, res as Response);

      expect(mockFetchUser).toHaveBeenCalledWith('1');
      expect(res.json).toHaveBeenCalledWith({ id: '1', name: 'John Doe' });
      expect(res.status).not.toHaveBeenCalled(); // No error, so status not set
    });

    it('should return 404 when user does not exist', async () => {
      req.params = { id: '1' };
      mockFetchUser.mockResolvedValue(null);

      await fetchUserData(req as Request, res as Response);

      expect(mockFetchUser).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    it('should return 500 on error', async () => {
      req.params = { id: '1' };
      mockFetchUser.mockRejectedValue(new Error('Database error'));

      await fetchUserData(req as Request, res as Response);

      expect(mockFetchUser).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
    });
  });

  describe('updateUserData', () => {
    it('should update user data when user exists', async () => {
        req.params = { id: '1' };
        req.body = { name: 'Jane Doe' };
    
        const existingUser = { id: '1', name: 'John Doe', email: 'N/A', age: 'N/A' };
        mockFetchUser.mockResolvedValue(existingUser);
        const updatedUser = { ...existingUser, ...req.body };
        mockUpdateUser.mockResolvedValue(updatedUser);
    
        await updateUserData(req as Request, res as Response);
    
        expect(mockFetchUser).toHaveBeenCalledWith('1');
        expect(mockUpdateUser).toHaveBeenCalledWith('1', updatedUser); // Match the complete payload
      });

    it('should return 404 when user does not exist', async () => {
      req.params = { id: '1' };
      req.body = { name: 'Jane Doe' };
      mockFetchUser.mockResolvedValue(null);

      await updateUserData(req as Request, res as Response);

      expect(mockFetchUser).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    it('should return 500 on error', async () => {
      req.params = { id: '1' };
      req.body = { name: 'Jane Doe' };
      mockFetchUser.mockRejectedValue(new Error('Database error'));

      await updateUserData(req as Request, res as Response);

      expect(mockFetchUser).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
    });
  });
});
