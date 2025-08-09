import React from 'react'
import { Title } from '../components/Title'
import { NavLink } from 'react-router-dom'

export const Login = () => {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>
            <div className='text-2xl w-full max-w-lg text-center'>
                <Title text1='Login' text2='' />
            </div>
            <form className='flex flex-col gap-5 w-full max-w-lg'>
                <input type="text" name="email" id="email" placeholder='Email' className='border border-gray-400 rounded-md py-2 px-2 focus:outline-gray-200' />
                <input type="text" name="password" id="password" placeholder='Password' className='border border-gray-400 rounded-md py-2 px-2 focus:outline-gray-200' />
                <button type='submit' className='bg-black cursor-pointer text-white py-2 rounded-md'>
                    Sign in
                </button>
                <div className='text-sm flex justify-between'>
                    <NavLink to={'forget-password'}>
                        Forgot your password?
                    </NavLink>
                    <NavLink to={'forget-password'}>
                        Forgot your password?
                    </NavLink>
                </div>
            </form>
        </div>
    )
}
