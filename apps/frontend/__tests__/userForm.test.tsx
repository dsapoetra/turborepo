import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserForm from '../src/components/userForm';

describe('UserForm Component', () => {
  it('renders the form correctly', () => {
    render(<UserForm />);
    expect(screen.getByText(/User Search and Update/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/User ID/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Fetch User/i })).toBeInTheDocument();
  });

  it('enables fetch button when User ID is entered', () => {
    render(<UserForm />);
    const input = screen.getByLabelText(/User ID/i);
    const fetchButton = screen.getByRole('button', { name: /Fetch User/i });

    expect(fetchButton).toBeDisabled(); // Initially disabled

    fireEvent.change(input, { target: { value: '123' } });
    expect(fetchButton).toBeEnabled(); // Enabled after entering ID
  });

  it('displays error message if fetch fails', async () => {
    // Mock the fetchUserData function to simulate failure
    jest.mock('../src/apis/userApi', () => ({
      fetchUserData: jest.fn(() => Promise.reject(new Error('User not found'))),
    }));

    render(<UserForm />);
    const input = screen.getByLabelText(/User ID/i);
    const fetchButton = screen.getByRole('button', { name: /Fetch User/i });

    fireEvent.change(input, { target: { value: '123' } });
    fireEvent.click(fetchButton);

    const errorMessage = await screen.findByText(/User not found or an error occurred/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
