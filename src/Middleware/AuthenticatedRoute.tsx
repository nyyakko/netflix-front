import { useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router';

import * as UserService from '../Api/User/UserService.ts';

export default function AuthenticatedRouteMiddleware({ children }: { children: ReactNode })
{
    const navigate = useNavigate();

    useEffect(() => {
        UserService
            .me()
            .catch(() => {
                navigate('/entrar');
            });
    }, []);

    return children;
}
