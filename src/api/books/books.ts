const API_URL = 'http://localhost:3007';


export interface AllBooksResponse {
    data: BookObject[];
}

export interface BookObject {
        id: number,
        title: string,
        author: string,
        uniqueIdentifier: string
}

export const fetchAllBooks = async (credentials: { token: string }) => {
    const response = await fetch(`${API_URL}/books/all`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + credentials?.token,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Не удалось получить книги');
    }
    return response.json();
};

export const fetchBookFile = async (credentials: { token: string, id: string }) => {
    const response = await fetch(`${API_URL}/books/read/${credentials?.id}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + credentials?.token,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Не удалось получить книги');
    }
    return response.json();
};