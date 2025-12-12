import { type MovieRequest } from './Contracts/Requests/MovieRequest.ts';
import { type MovieResponse } from './Contracts/Responses/MovieResponse.ts';

const endpoint = `${import.meta.env.VITE_API_BASE_URL}/api/movies`;

export async function save(request: MovieRequest): Promise<void>
{
    const response = await fetch(`${endpoint}`, {
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

export async function deleteById(id: number): Promise<void>
{
    const response = await fetch(`${endpoint}/${id}`, {
        method: 'DELETE',
        credentials: 'include'
    });

    if (!response.ok) {
        return Promise.reject(await response.json());
    }
}

export async function get(page: number | undefined, limit: number | undefined): Promise<MovieResponse[]>
{
    let params = [];

    if (page) params.push(`page=${page}`);
    if (limit) params.push(`limit=${limit}`);

    const response = await fetch(`${endpoint}` + (params.length ? '?' + params.join('&') : ''), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    });

    if (!response.ok) {
        return Promise.reject(await response.json());
    }

    return await response.json();
}

export async function getById(id: number): Promise<MovieResponse>
{
    const response = await fetch(`${endpoint}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    });

    if (!response.ok) {
        return Promise.reject(await response.json());
    }

    return await response.json();
}
