import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from '../components/index';
import InputFront from '../components/InputFront';
import authService from '../appwrite/auth';

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');

  const create = async (data) => {
    setError('');
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUserData();
        if (userData) {
          dispatch(authLogin(userData));
          navigate('/');
        }
      }
    } catch (error) {
    //   setError(error.message);
        setError('Fill password in correct format. Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character.')
        console.log(error.message);
    }
  };

  return (
    <div className='flex items-center justify-center w-full signup bg-black'>
      <div className='w-full max-w-4xl flex'>
        <div className='flex-1 bg-black p-6 text-white'>
          <div className='mb-4 flex justify-center'>
            <Logo src='../../static/logo-square.png' width='100%' />
          </div>
          <h2 className='text-3xl font-extrabold text-center mb-2'>
            Sign up for your account
          </h2>
          <p className='text-base text-gray-300 text-center'>
            Already have an account?
            <Link to='/login' className='font-medium text-primary hover:underline'>
              Log in here
            </Link>
          </p>
        </div>
        <div className='flex-1 bg-black p-6 border border-black/10 mt-0'>
          {error && <p className='text-white text-center mb-4'>{error}</p>}
          {console.log(error)}
          <form onSubmit={handleSubmit(create)}>
            <div className='space-y-4'>
              <InputFront
                label='Name'
                placeholder='Enter your name'
                type='text'
                {...register('name', {
                  required: true,
                })}
              />
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
                Create Account
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
