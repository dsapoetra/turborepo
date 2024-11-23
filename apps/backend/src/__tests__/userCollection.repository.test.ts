import { fetchUser, updateUser } from '../repository/userCollection';
import { firestore } from '../config/firebaseConfig';
import { User } from '../entities/user';

// Mock Firestore
jest.mock('../config/firebaseConfig', () => ({
  firestore: {
    collection: jest.fn(),
  },
}));

describe('User Repository Tests', () => {
  const mockCollection = jest.fn();
  const mockDoc = jest.fn();
  const mockGet = jest.fn();
  const mockUpdate = jest.fn();

  beforeEach(() => {
    // Mock Firestore methods
    (firestore.collection as jest.Mock).mockImplementation(mockCollection);
    mockCollection.mockReturnValue({ doc: mockDoc });
    mockDoc.mockImplementation(() => ({ get: mockGet, update: mockUpdate }));
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  describe('fetchUser', () => {
    it('should return user data when user exists', async () => {
      const userData = { id: '1', name: 'John Doe', email: 'john@example.com', age: 30 };
      mockGet.mockResolvedValue({
        exists: true,
        data: jest.fn().mockReturnValue(userData), // Mock Firestore's data() method
      });
  
      const result = await fetchUser('1');
  
      expect(firestore.collection).toHaveBeenCalledWith('USERS');
      expect(mockDoc).toHaveBeenCalledWith('1');
      expect(mockGet).toHaveBeenCalled();
      expect(result).toEqual(userData);
    });
  
    it('should return null when user does not exist', async () => {
      mockGet.mockResolvedValue({
        exists: false,
        data: jest.fn(), // Even when it doesn't exist, Firestore's doc still has a data method
      });
  
      const result = await fetchUser('1');
  
      expect(firestore.collection).toHaveBeenCalledWith('USERS');
      expect(mockDoc).toHaveBeenCalledWith('1');
      expect(mockGet).toHaveBeenCalled();
      expect(result).toBeNull();
    });
  
    it('should throw an error on Firestore failure', async () => {
      mockGet.mockRejectedValue(new Error('Firestore error'));
  
      await expect(fetchUser('1')).rejects.toThrow('Firestore error');
      expect(firestore.collection).toHaveBeenCalledWith('USERS');
      expect(mockDoc).toHaveBeenCalledWith('1');
      expect(mockGet).toHaveBeenCalled();
    });
  });
  

  describe('updateUser', () => {
    it('should update user data when called with valid fields', async () => {
      const userData = { name: 'Jane Doe', email: 'jane@example.com' };
      mockUpdate.mockResolvedValueOnce(undefined); // Firestore's update returns void

      await updateUser('1', userData);

      expect(firestore.collection).toHaveBeenCalledWith('USERS');
      expect(mockDoc).toHaveBeenCalledWith('1');
      expect(mockUpdate).toHaveBeenCalledWith(userData);
    });

    it('should remove undefined fields from user data before updating', async () => {
      const userData = { name: 'Jane Doe', email: undefined };
      const filteredData = { name: 'Jane Doe' };
      mockUpdate.mockResolvedValueOnce(undefined);

      await updateUser('1', userData);

      expect(firestore.collection).toHaveBeenCalledWith('USERS');
      expect(mockDoc).toHaveBeenCalledWith('1');
      expect(mockUpdate).toHaveBeenCalledWith(filteredData);
    });

    it('should throw an error on Firestore failure', async () => {
      const userData = { name: 'Jane Doe' };
      mockUpdate.mockRejectedValue(new Error('Firestore error'));

      await expect(updateUser('1', userData)).rejects.toThrow('Firestore error');
      expect(firestore.collection).toHaveBeenCalledWith('USERS');
      expect(mockDoc).toHaveBeenCalledWith('1');
      expect(mockUpdate).toHaveBeenCalledWith(userData);
    });
  });
});
