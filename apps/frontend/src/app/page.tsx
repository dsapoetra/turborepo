'use client';

import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const navigateToLogin = () => {
    router.push('/login');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h2">Welcome to My App</Typography>
      <Typography variant="body1" style={{ margin: '20px 0' }}>
        This is the main page.
      </Typography>
      <Button variant="contained" onClick={navigateToLogin}>
        Go to Login
      </Button>
    </div>
  );
}
