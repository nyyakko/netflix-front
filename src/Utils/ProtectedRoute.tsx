import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router';
import { useEffect, useRef, type ReactNode } from 'react';

import * as UserService from '../Api/User/UserService.ts';

export default function ProtectedRoute({ roles, children }: { roles?: string[], children: ReactNode })
{
    const navigate = useNavigate();

    const toast = useRef<Toast>(null);

    useEffect(() => {
        UserService
            .me()
            .then(user => {
                if (!roles?.every(role => user?.roles.map(role_ => role_.name).includes(role))) {
                    toast.current?.show({ severity: 'error', summary: 'Falha', detail: 'Você não possui permissão para acessar essa página' });
                    navigate('/');
                }
            })
            .catch(() => {
                navigate('/entrar');
            });
    }, []);

    return (
        <>
            <Toast ref={toast}/>
            {children}
        </>
    );
}
