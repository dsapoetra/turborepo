import { Request, Response } from 'express';
import { fetchUser, updateUser } from '../repository/userCollection';

// Fetch user data
export const fetchUserData = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  console.log('Fetching user with ID:', id);

  try {
    const user = await fetchUser(id);

    if (!user) {
      console.log('User not found:', id);
      res.status(404).json({ message: 'User not found' });
      return;
    }

    console.log('Fetched user data:', user);
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: (error as Error).message });
  }
};

// Update user data
export const updateUserData = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const userData = req.body;

  try {
    const existingUser = await fetchUser(id);

    if (!existingUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const updatedData = {
      ...existingUser,
      ...userData,
    };

    await updateUser(id, updatedData);
    const updatedUser = await fetchUser(id);

    res.status(200).json({ message: 'User updated successfully', data: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: (error as Error).message });
  }
};
