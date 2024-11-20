const API_URL = 'http://localhost:3007';

export const register = async (name: string, email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/registration`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });
    if (!response.ok) {
        throw new Error('Registration failed');
    }
    return response.json();
};