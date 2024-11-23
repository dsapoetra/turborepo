import fetchMock from 'jest-fetch-mock';
import { fetchUserData, updateUserData } from '../src/apis/userApi';

// Enable fetch mocks
fetchMock.enableMocks();

describe('User API', () => {
    beforeEach(() => {
        fetchMock.resetMocks(); // Reset mocks before each test
    });

    it('fetches user data successfully', async () => {
        const mockUser = { id: 1, name: 'John Doe' };
        fetchMock.mockResponseOnce(JSON.stringify(mockUser)); // Mock fetch response

        const result = await fetchUserData('1');
        expect(fetchMock).toHaveBeenCalledWith("http://localhost:3005/api/fetch-user-data/1"); // Check fetch call
        expect(result).toEqual(mockUser); // Check returned result
    });

    it('creates a new user successfully', async () => {
        const newUser = { name: 'Jane Doe' };
        const createdUser = { id: 2, ...newUser };
        fetchMock.mockResponseOnce(JSON.stringify(createdUser)); // Mock fetch response
    
        const result = await updateUserData('2', newUser);
    
        expect(fetchMock).toHaveBeenCalledWith(
            "http://localhost:3005/api/update-user-data/2",
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            }
        ); // Check fetch call
        expect(result).toEqual(createdUser); // Check returned result
    });
    
});
