const API_URL = 'http://localhost:3007';

export interface LoginResponse {
    access_token: string;
}

export const login = async (credentials: { email: string; password: string }): Promise<LoginResponse> => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    return response.json();
};