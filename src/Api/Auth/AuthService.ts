import { type RegisterRequest } from './Contracts/Requests/RegisterRequest.ts';
import { type LoginRequest } from './Contracts/Requests/LoginRequest.ts';

const endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/auth`;

export async function signIn(request: LoginRequest): Promise<void>
{
    const response = await fetch(`${endpoint}/signin`, {
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

export async function signOff()
{
    const response = await fetch(`${endpoint}/signoff`, {
        method: 'POST',
        credentials: 'include'
    });

    if (!response.ok) {
        return Promise.reject(await response.json());
    }
}

export async function signUp(request: RegisterRequest): Promise<void>
{
    const response = await fetch(`${endpoint}/signup`, {
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
