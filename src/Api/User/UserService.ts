import { type UserResponse } from './Contracts/Responses/UserResponse.ts';

const endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/users`;

export async function me(): Promise<UserResponse | null>
{
    const response = await fetch(`${endpoint}/me`, {
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (response.ok) {
        return await response.json();
    } else {
        return Promise.reject(await response.json());
    }
}
