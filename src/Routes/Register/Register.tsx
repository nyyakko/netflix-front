import { FaRegCircleXmark } from 'react-icons/fa6';

import { useNavigate } from 'react-router';
import { useState } from 'react';

import * as AuthService from '../../Api/Auth/AuthService.ts';

import type { RegisterRequest } from '../../Api/Auth/Contracts/Requests/RegisterRequest';

import './Register.css';

export default function Register()
{
    const navigate = useNavigate();

    const [request, setRequest] = useState<RegisterRequest>({});
    const [errors, setErrors] = useState<string[]>([]);

    const onRegister = () => {
        if (!(request.email && request.password)) {
            const fields: string[] = [];
            if (!request.name) fields.push('MISSING_NAME');
            if (!request.email) fields.push('MISSING_EMAIL');
            if (!request.password) fields.push('MISSING_PASSWORD');
            setErrors([...fields]);
            return;
        }

        AuthService
            .signup(request!)
            .then(() => {
                navigate('/entrar');
            })
            .catch(error => {
                setErrors([...errors, error.code]);
            });
    };

    return (
        <div className='w-full 2xl:flex 2xl:flex-col h-[100vh]'>
            <svg className='w-full block h-20 px-40 py-5'>
                <path className='fill-red-600 scale-140' d='M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z' />
            </svg>
            <div className='w-full py-10 flex flex-col 2xl:flex-1 2xl:grow 2xl:justify-center items-center'>
                <div className='bg-black/65 rounded shadow px-15 py-12 w-120 2xl:min-h-160 h-fit'>
                    <div className='mb-6'>
                        <label className='text-3xl font-bold text-white'>Cadastrar</label>
                    </div>
                    {
                        errors?.includes('USER_ALREADY_EXISTS')
                            ?
                                <div className='mb-5 rounded px-5 py-5 bg-yellow-600'>
                                    O email informado já está cadastrado.
                                </div>
                            : <></>
                    }
                    <div className='mb-5'>
                        <input
                            id='name'
                            className={`shadow px-4 py-3 rounded border ${errors?.includes('MISSING_NAME') ? 'border-red-400' : 'border-gray-400'} w-full text-gray-100 backdrop-blur-sm`}
                            placeholder='Usuário'
                            onChange={(e) => {
                                setRequest({...request, email: e.target.value});
                                setErrors(errors.filter(x => x != 'MISSING_NAME'));
                            }}
                        />
                        {
                            errors?.includes('MISSING_NAME')
                                ?
                                    <div className='mt-2 flex gap-1.5'>
                                        <FaRegCircleXmark className='fill-red-400'/>
                                        <small className='text-red-400'>Informe um nome de usuário válido.</small>
                                    </div>
                                : <></>
                        }
                    </div>
                    <div className='mb-5'>
                        <input
                            id='email'
                            type='email'
                            className={`shadow px-4 py-3 rounded border ${errors?.includes('MISSING_EMAIL') ? 'border-red-400' : 'border-gray-400'} w-full text-gray-100 backdrop-blur-sm`}
                            placeholder='Email'
                            onChange={(e) => {
                                setRequest({...request, email: e.target.value});
                                setErrors(errors.filter(x => x != 'MISSING_EMAIL'));
                            }}
                        />
                        {
                            errors?.includes('MISSING_EMAIL')
                                ?
                                    <div className='mt-2 flex gap-1.5'>
                                        <FaRegCircleXmark className='fill-red-400'/>
                                        <small className='text-red-400'>Informe um email válido.</small>
                                    </div>
                                : <></>
                        }
                    </div>
                    <div className='mb-5'>
                        <input
                            id='password'
                            type='password'
                            className={`shadow px-4 py-3 rounded border ${errors?.includes('MISSING_PASSWORD') ? 'border-red-400' : 'border-gray-400'} w-full text-gray-100 backdrop-blur-sm`}
                            placeholder='Senha'
                            onChange={(e) => {
                                setRequest({...request, password: e.target.value});
                                setErrors(errors.filter(x => x != 'MISSING_PASSWORD'));
                            }}
                        />
                        {
                            errors?.includes('MISSING_PASSWORD')
                                ?
                                    <div className='mt-2 flex gap-1.5'>
                                        <FaRegCircleXmark className='fill-red-400'/>
                                        <small className='text-red-400'>Informe uma senha válida.</small>
                                    </div>
                                : <></>
                        }
                    </div>
                    <div className='mb-5'>
                        <button className='block rounded bg-red-600 hover:bg-red-700 active:bg-red-900 text-white w-full py-2 font-semibold cursor-pointer' onClick={onRegister}>
                            Assinar
                        </button>
                    </div>
                    <div className='text-gray-300'>
                        Já possui uma conta?
                        <a className='ml-1 text-white font-semibold hover:underline cursor-pointer' onClick={() => { navigate('/entrar') }}>Entre agora.</a>
                    </div>
                </div>
            </div>
            <img className='fixed top-0 left-0 bg-repeat z-[-1] brightness-35' src='https://assets.nflxext.com/ffe/siteui/vlv3/bebd95d0-65f9-41a9-9d12-4794db63653e/web/BR-en-20250922-TRIFECTA-perspective_b89b987c-d8b7-42a2-b7ad-72b57c775bd8_large.jpg'></img>
        </div>
    )
}

