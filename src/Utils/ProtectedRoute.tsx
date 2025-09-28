import { useNavigate } from 'react-router';
import { useEffect, useState, type ReactNode } from 'react';

import * as UserService from '../Api/User/UserService.ts';

export default function ProtectedRoute({ roles, redirectElement, children }: { roles?: string[], redirectElement?: ReactNode, children: ReactNode })
{
    const navigate = useNavigate();

    const [redirect, setRedirect] = useState<ReactNode>();

    useEffect(() => {
        UserService
            .me()
            .then(user => {
                if (!roles?.every(role => user?.roles.map(role_ => role_.name).includes(role))) {
                    navigate('/');
                }
            })
            .catch(() => {
                if (redirectElement) {
                    setRedirect(redirectElement);
                } else {
                    navigate('/entrar');
                }
            });
    }, []);

    return redirect ? redirect : (
        <>
            {children}
        </>
    );
}
