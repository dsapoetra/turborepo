'use client';

import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserError,
  updateUserStart,
  updateUserSuccess,
  updateUserError,
} from '../store/reducers';
import { fetchUserData, updateUserData } from '../apis/userApi';
import { RootState } from '../store/store';
import { User } from '../types/User'; // Import the User type

export const UpdateButton = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.user) as {
    data: User | null;
    loading: boolean;
    error: string | null;
  };

  const handleFetchUser = async () => {
    dispatch(fetchUserStart());
    try {
      const userData = await fetchUserData('user_id_123'); // Replace with dynamic ID
      dispatch(fetchUserSuccess(userData));
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch(fetchUserError(err.message));
      } else {
        dispatch(fetchUserError('An error occurred while fetching user data.'));
      }
    }
  };

  const handleUpdateUser = async () => {
    dispatch(updateUserStart());
    try {
      const updatedData = await updateUserData('user_id_123', { name: 'Updated Name' });
      dispatch(updateUserSuccess(updatedData));
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch(updateUserError(err.message));
      } else {
        dispatch(updateUserError('An error occurred while updating user data.'));
      }
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleFetchUser} disabled={loading}>
        Fetch User Data
      </Button>
      <Button variant="contained" onClick={handleUpdateUser} disabled={loading}>
        Update User Data
      </Button>

      {loading && <Typography>Loading...</Typography>}
      {data && <Typography>User Data: {JSON.stringify(data)}</Typography>}
      {error && <Typography color="error">Error: {error}</Typography>}
    </div>
  );
};
