import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { set, useForm } from 'react-hook-form';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from '../components/index';
import InputFront from '../components/InputFront';
import authService from '../appwrite/auth';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(false);

  const login = async (data) => {
    setError('');
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate('/');
        }
      }
    } catch (error) {
      // setError(error.message);
      // setError('Email or password is incorrect');
      setError(true);
    }
  };

  return (
    <div className='flex items-center justify-center w-full login bg-black'>
      <div className='w-full max-w-4xl flex'>
        <div className='flex-1 bg-black p-6 text-white'>
          <div className='mb-4 flex justify-center'>
            <Logo src='../../public/static/logo-square.png' width='100%' />
          </div>
          <h2 className='text-3xl font-extrabold text-center mb-2'>
            Log in to your account
          </h2>
          <p className='text-base text-gray-300 text-center'>
            Don't have an account?
            <Link
              to='/signup'
              className='font-medium text-primary hover:underline'
            >
              Sign up here
            </Link>
          </p>
        </div>
        <div className='flex-1 bg-black p-6 border border-black/10'>
          {error && <p className='text-red-600 text-center mb-4'>Incorrect Email or Password</p>}
          <form onSubmit={handleSubmit(login)}>
            <div className='space-y-4'>
              <InputFront
                label='Email'
                placeholder='Enter your email'
                type='email'
                {...register('email', {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                      'Email address must be a valid address',
                  },
                })}
              />
              <InputFront
                label='Password'
                placeholder='Enter your Password'
                type='password'
                {...register('password', {
                  required: true,
                })}
              />
              <Button type='submit' className='w-full bg-blue-900 hover:bg-blue-950'>
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
