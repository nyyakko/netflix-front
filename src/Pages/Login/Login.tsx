import { useNavigate } from 'react-router';
import { useState } from 'react';

import { userUser } from '../../Contexts/UserContext.tsx';

import * as AuthService from '../../Api/Auth/AuthService.ts';
import * as UserService from '../../Api/User/UserService.ts';

import type { LoginRequest } from '../../Api/Auth/Contracts/Requests/LoginRequest.ts';

import InputField, { type InputFieldState } from '../../Components/InputField.tsx';

import './Login.css';

interface FormState {
    error?: string
    field: {
        email: InputFieldState
        password: InputFieldState
    }
};

export default function Login()
{
    const navigate = useNavigate();

    const userContext = userUser();

    const [request, setRequest] = useState<LoginRequest>({ email: '', password: '' });
    const [state, setState] = useState<FormState>({ field: { email: 'OK', password: 'OK' } });

    const onLogin = async () => {
        const state: FormState = { field: { email: 'OK', password: 'OK' } };
        setState(state);

        if (!request.email || !request.password) {
            if (!request.email) state.field.email = 'MISSING_FIELD';
            if (!request.password) state.field.password = 'MISSING_FIELD';
            setState(state);
            return;
        }

        try {
            await AuthService.signIn(request!);
            userContext.setUser(await UserService.me());
            navigate('/');
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
                    <h1 className='block mb-6 text-3xl font-bold text-white'>Entrar</h1>
                    {
                        state.error == 'INVALID_CREDENTIALS'
                            ?
                                <div className='mb-5 rounded px-5 py-5 bg-yellow-600'>
                                    Não foi possível conectar-se com a conta informada. Tente novamente ou crie uma nova.
                                </div>
                            : <></>
                    }
                    <InputField field='email' type='text' value={request} setValue={setRequest} placeholder='Email' state={state.field.email}/>
                    <InputField field='password' type='password' value={request} setValue={setRequest} placeholder='Senha' state={state.field.password}/>
                    <button className='block rounded bg-red-600 hover:bg-red-700 active:bg-red-900 text-white w-full py-2 font-semibold cursor-pointer' onClick={onLogin}>
                        Entrar
                    </button>
                    <div className='block text-center py-4 uppercase text-gray-100'>Ou</div>
                    <button className='block rounded bg-gray-600/40 hover:bg-gray-700/40 active:bg-gray-900/40 text-white w-full py-2 font-semibold cursor-pointer'>
                        Esqueceu a senha?
                    </button>
                    <div className='block'>
                        <input className='my-5 w-4 h-4 accent-white' type='checkbox' id='remember-me'></input>
                        <label className='text-white ml-3' htmlFor='remember-me'>Lembre-se de mim</label>
                    </div>
                    <div className='block text-gray-300'>
                        Primeira vez aqui?
                        <a className='ml-1 text-white font-semibold hover:underline cursor-pointer' onClick={() => { navigate('/cadastre-se') }}>Cadastre-se agora.</a>
                    </div>
                </div>
            </div>
            <img className='fixed top-0 left-0 bg-repeat z-[-1] brightness-45' src='https://assets.nflxext.com/ffe/siteui/vlv3/29b665f6-0a62-4745-b9c2-f617fb7eadc6/web/BR-en-20251208-TRIFECTA-perspective_9f466850-4d49-4097-8da9-ccfa98dbac3a_large.jpg'></img>
        </div>
    )
}
