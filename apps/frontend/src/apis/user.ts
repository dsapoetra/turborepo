export const fetchUserData = async () => {
    const response = await fetch('/api/fetch-user-data/:id');
    if (!response.ok) throw new Error('Failed to fetch user data');
    return response.json();
  };
  