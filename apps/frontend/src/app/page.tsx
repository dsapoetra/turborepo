'use client';

import { Typography } from '@mui/material';
import { UpdateButton } from 'src/components/updateButton';
import UserForm from 'src/components/userForm';

export default function Home() {


  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h2">Welcome to My App</Typography>
      <Typography variant="body1" style={{ margin: '20px 0' }}>
        This is the main page.
      </Typography>
      <UserForm />
      <UpdateButton />
    </div>
  );
}
