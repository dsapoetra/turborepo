'use client';

import { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { fetchUserData, updateUserData } from '../apis/userApi';

// Define the user type to include the 'email' field
type User = {
  id: string;
  name: string;
  age: number;
  email?: string; // Optional field, matching the API response
};


export default function UserForm() {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updateFields, setUpdateFields] = useState<Partial<User>>({});

  const handleFetchUser = async () => {
    setLoading(true);
    setError(null);
  
    try {
      console.log(`Fetching user data for ID: ${userId}`);
      const data = await fetchUserData(userId); // Fetch data from the backend
      console.log('Fetched data:', data);
  
      // Ensure all fields are correctly set, including the ID
      setUserData({
        id: data.id ?? userId, // Fallback to `userId` if the backend does not return `id`
        name: data.name ?? 'N/A',
        age: data.age ?? 'N/A',
        email: data.email ?? 'N/A',
      });
  
      setUpdateFields(data); // Prepopulate update form with current values
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('User not found or an error occurred.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleUpdateUser = async () => {
    setLoading(true);
    setError(null);

    try {
        const filteredFields = Object.fromEntries(
            Object.entries(updateFields).filter(([, value]) => value !== '' && value !== undefined)
        );

        console.log('Updating user with fields:', filteredFields);

        await updateUserData(userId, filteredFields);
        const freshUserData = await fetchUserData(userId);

        console.log('Fetched updated user data:', freshUserData);

        setUserData({
            id: userId,
            name: freshUserData.name ?? 'N/A',
            age: freshUserData.age ?? 'N/A',
            email: freshUserData.email ?? 'N/A',
        });

        alert('User updated successfully!');
    } catch (err) {
        console.error('Error updating user data:', err);
        setError('Update failed or an error occurred.');
    } finally {
        setLoading(false);
    }
};


  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
      <Typography variant="h4">User Search and Update</Typography>

      <div style={{ marginTop: '20px' }}>
        <TextField
          label="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          fullWidth
          style={{ marginBottom: '10px' }}
        />
        <Button
          variant="contained"
          onClick={handleFetchUser}
          disabled={loading || !userId}
          fullWidth
        >
          {loading ? 'Fetching...' : 'Fetch User'}
        </Button>
      </div>

      {error && (
        <Typography color="error" style={{ marginTop: '10px' }}>
          {error}
        </Typography>
      )}

      {userData && (
        <div style={{ marginTop: '20px', textAlign: 'left' }}>
          <Typography variant="h6">User Data:</Typography>
          <Typography>ID: {userData.id || 'N/A'}</Typography>
          <Typography>Name: {userData.name || 'N/A'}</Typography>
          <Typography>Age: {userData.age || 'N/A'}</Typography>
          <Typography>Email: {userData.email || 'N/A'}</Typography>

          <div style={{ marginTop: '20px' }}>
            <TextField
              label="Update Name"
              value={updateFields.name || ''}
              onChange={(e) => setUpdateFields({ ...updateFields, name: e.target.value })}
              fullWidth
              style={{ marginBottom: '10px' }}
            />
            <TextField
              label="Update Age"
              type="number"
              value={updateFields.age || ''}
              onChange={(e) =>
                setUpdateFields({ ...updateFields, age: parseInt(e.target.value, 10) || undefined })
              }
              fullWidth
              style={{ marginBottom: '10px' }}
            />
            <TextField
              label="Update Email"
              value={updateFields.email || ''}
              onChange={(e) => setUpdateFields({ ...updateFields, email: e.target.value })}
              fullWidth
              style={{ marginBottom: '10px' }}
            />
            <Button
              variant="contained"
              onClick={handleUpdateUser}
              disabled={loading || Object.keys(updateFields).length === 0}
              fullWidth
            >
              {loading ? 'Updating...' : 'Update User'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
