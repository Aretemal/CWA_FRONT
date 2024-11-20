// src/Login.tsx
import React, { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { login, LoginResponse } from '../../api/auth/login';
import { setAccessToken } from '../../redux/slices/auth/authSlice';
import { getAuthToken } from '../../redux/slices/auth/authSelectors';
import { Button, Flex, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const accessToken = useSelector(getAuthToken);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const mutation = useMutation<LoginResponse, { message: string }, { email: string, password: string }>(
        {
            mutationFn: login,
            onSuccess: (data: { access_token: string }) => {
                dispatch(setAccessToken(data.access_token));
            },
            onError: (error: { message: string }) => {
                console.error('Login failed:', error.message);
            },
        }
    );

    const onSignIn = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate({ email, password });
    };

    useEffect(() => {
        if (accessToken) {
            navigate('/main');
        }
    }, [accessToken])

    return (
        <Flex
            className='w-full h-full'
            align='center'
            justify='center'
        >
            <Flex
                vertical
                align='center'
            >
                <Flex
                    className="mb-2 text-3xl font-bold text-blue-500"
                >
                    Вход в ЛитераТек
                </Flex>
                <Flex
                    style={{
                        width: 300
                    }}
                    vertical
                    className='px-4 py-4 rounded-md !bg-gray-100'
                >
                    <span
                        className='text-base text-blue-500'
                    >
                        Почта
                    </span>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <span
                        className='mt-2 text-base text-blue-500'
                    >
                        Пароль
                    </span>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        className='mt-4'
                        onClick={onSignIn}
                    >
                        Войти
                    </Button>
                    <span
                        className='text-blue-500'
                        onClick={() => navigate('/registration')}
                    >
                        Регистрация
                    </span>
                    {mutation.isError && <p>Error: {mutation.error.message}</p>}
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Login;