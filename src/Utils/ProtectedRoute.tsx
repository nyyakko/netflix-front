import { useNavigate } from 'react-router';
import { useEffect, type ReactNode } from 'react';

import * as UserService from '../Api/User/UserService.ts';

export default function ProtectedRoute({ roles, children }: { roles?: string[], children: ReactNode })
{
    const navigate = useNavigate();

    useEffect(() => {
        UserService
            .me()
            .then(user => {
                if (!roles?.every(role => user?.roles.map(role_ => role_.name).includes(role))) {
                    navigate('/');
                }
            })
            .catch(() => {
                navigate('/entrar');
            });
    }, []);

    return (
        <>
            {children}
        </>
    );
}
