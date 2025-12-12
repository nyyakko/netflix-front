import { useNavigate } from 'react-router';
import { useState } from 'react';

import * as AuthService from '../../Api/Auth/AuthService.ts';

import type { RegisterRequest } from '../../Api/Auth/Contracts/Requests/RegisterRequest.ts';

import InputField, { type InputFieldState } from '../../Components/InputField.tsx';

import './Signup.css';

interface FormState {
    error?: string
    field: {
        name: InputFieldState
        email: InputFieldState
        password: InputFieldState
    }
};

export default function Signup()
{
    const navigate = useNavigate();

    const [request, setRequest] = useState<RegisterRequest>({ name: '', email: '', password: '' });
    const [state, setState] = useState<FormState>({ field: { name: 'OK', email: 'OK', password: 'OK' } });

    const onRegister = async () => {
        const state: FormState = { field: { name: 'OK', email: 'OK', password: 'OK' } };
        setState(state);

        if (!request.name || !request.email || !request.password) {
            if (!request.name) state.field.name = 'MISSING_FIELD';
            if (!request.email) state.field.email = 'MISSING_FIELD';
            if (!request.password) state.field.password = 'MISSING_FIELD';
            setState(state);
            return;
        }

        try {
            await AuthService.signUp(request!);
            navigate('/entrar');
        } catch (error: any) {
            setState({ ...state, error: error.code });
        }
    };

    return (
        <div className='w-full 2xl:flex 2xl:flex-col h-[100vh]'>
            <div className='block pl-45'>
                <img className='h-20' src='logo.png'></img>
            </div>
            <div className='w-full py-10 flex flex-col 2xl:flex-1 2xl:grow 2xl:justify-center items-center'>
                <div className='bg-black/65 rounded shadow px-15 py-12 w-120 2xl:min-h-160 h-fit'>
                    <h1 className='block mb-6 text-3xl font-bold text-white'>Cadastre-se</h1>
                    {
                        state.error == 'USER_ALREADY_EXISTS'
                            ?
                                <div className='mb-5 rounded px-5 py-5 bg-yellow-600'>
                                    O email informado já está cadastrado.
                                </div>
                            : <></>
                    }
                    <InputField field='name' type='text' value={request} setValue={setRequest} placeholder='Usuário' state={state.field.name}/>
                    <InputField field='email' type='email' value={request} setValue={setRequest} placeholder='Email' state={state.field.email}/>
                    <InputField field='password' type='password' value={request} setValue={setRequest} placeholder='Senha' state={state.field.password}/>
                    <button className='block mb-5 rounded bg-red-600 hover:bg-red-700 active:bg-red-900 text-white w-full py-2 font-semibold cursor-pointer' onClick={onRegister}>
                        Assinar
                    </button>
                    <div className='block text-gray-300'>
                        Já possui uma conta?
                        <a className='ml-1 text-white font-semibold hover:underline cursor-pointer' onClick={() => { navigate('/entrar') }}>Entre agora.</a>
                    </div>
                </div>
            </div>
            <img className='fixed top-0 left-0 bg-repeat z-[-1] brightness-45' src='https://assets.nflxext.com/ffe/siteui/vlv3/29b665f6-0a62-4745-b9c2-f617fb7eadc6/web/BR-en-20251208-TRIFECTA-perspective_9f466850-4d49-4097-8da9-ccfa98dbac3a_large.jpg'></img>
        </div>
    )
}

