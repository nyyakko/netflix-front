import { type RegisterRequest } from './Contracts/Requests/RegisterRequest.ts';
import { type LoginRequest } from './Contracts/Requests/LoginRequest.ts';

const endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/auth`;

export async function login(request: LoginRequest): Promise<void>
{
    const response = await fetch(`${endpoint}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request),
        credentials: 'include',
    });

    if (!response.ok) {
        return Promise.reject(await response.json());
    }
}

export async function logout()
{
    const response = await fetch(`${endpoint}/logout`, {
        method: 'POST',
        credentials: 'include'
    });

    if (!response.ok) {
        return Promise.reject(await response.json());
    }
}

export async function register(request: RegisterRequest): Promise<void>
{
    const response = await fetch(`${endpoint}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request),
        credentials: 'include'
    });

    if (!response.ok) {
        return Promise.reject(await response.json());
    }
}
