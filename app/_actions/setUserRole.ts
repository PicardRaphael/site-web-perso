export const setUserRole = async (role: 'user' | 'admin') => {
  try {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role }),
    });
    return response;
  } catch (error) {
    return 'Erreur lors de la connexion';
  }
};
