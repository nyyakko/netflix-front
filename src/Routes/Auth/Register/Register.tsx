import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router';
import { useState, useRef } from 'react';

import * as AuthService from '../../../Api/Auth/AuthService.ts';

import type { RegisterRequest } from '../../../Api/Auth/Contracts/Requests/RegisterRequest';

import './Register.css';

export default function Register()
{
    const navigate = useNavigate();

    const [request, setRequest] = useState<RegisterRequest>({});
    const toast = useRef<Toast>(null);

    const onRegister = () => {
        if (!(request.email && request.password)) {
            toast.current?.show({ severity: 'error', summary: 'Falha', detail: 'Há campos não preenchidos' });
            return;
        }

        AuthService
            .register(request!)
            .then(() => {
                navigate('/entrar');
            })
            .catch(e => {
                toast.current?.show({ severity: 'error', summary: 'Falha', detail: e.message });
            });
    };

    const footer = (
        <a href='/entrar' style={{textDecoration: 'none'}}>Já sou cadastrado</a>
    );

    return (
        <div id='register'>
            <Toast ref={toast}/>
            <Card title='Entrar' className='flex flex-col' footer={footer}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <InputText placeholder='Usuário' type='text' onChange={(e) => setRequest({...request, name: e.target.value})}></InputText>
                    <InputText placeholder='E-Mail' type='email' onChange={(e) => setRequest({...request, email: e.target.value})}></InputText>
                    <InputText placeholder='Senha' type='password' onChange={(e) => setRequest({...request, password: e.target.value})}></InputText>
                    <Button label='Cadastrar-se' onClick={onRegister}></Button>
                </div>
            </Card>
        </div>
    )
}

