import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router';
import { useState, useRef } from 'react';

import { userUser } from '../../../Contexts/UserContext.tsx';

import * as AuthService from '../../../Api/Auth/AuthService.ts';
import * as UserService from '../../../Api/User/UserService.ts';

import type { LoginRequest } from '../../../Api/Auth/Contracts/Requests/LoginRequest.ts';

import './Login.css';

export default function Login()
{
    const navigate = useNavigate();

    const userContext = userUser();
    const [request, setRequest] = useState<LoginRequest>({});
    const toast = useRef<Toast>(null);

    const onLogin = () => {
        if (!(request.email && request.password)) {
            toast.current?.show({ severity: 'error', summary: 'Falha', detail: 'Há campos não preenchidos' });
            return;
        }

        AuthService
            .login(request!)
            .then(() => {
                UserService
                    .me()
                    .then(user => {
                        userContext.setUser(user);
                        navigate('/');
                    });
            })
            .catch(e => {
                toast.current?.show({ severity: 'error', summary: 'Falha', detail: e.message });
            });
    };

    const footer = (
        <a href='/registrar' style={{textDecoration: 'none'}}>Não sou cadastrado</a>
    );

    return (
        <div id='login'>
            <Toast ref={toast}/>
            <Card title='Entrar' className='flex flex-col' footer={footer}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <InputText placeholder='E-Mail' type='email' onChange={(e) => setRequest({...request, email: e.target.value})}></InputText>
                    <InputText placeholder='Senha' type='password' onChange={(e) => setRequest({...request, password: e.target.value})}></InputText>
                    <Button label='Logar' onClick={onLogin}></Button>
                </div>
            </Card>
        </div>
    )
}

