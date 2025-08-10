import React from 'react'
import { NavLink } from 'react-router-dom'
import { Title } from '../components/Title'

export const Signup = () => {
    const omSubmitHandler = async (e: React.FormEvent) => { 
        e.preventDefault()
        try {
            alert('Login Successfull')
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <div className='flex flex-col justify-center items-center min-h-screen'>
                <div className='font-light text-4xl w-full max-w-lg text-center py-10'>
                    <Title text1='Signup' text2='' />
                </div>
                <form onSubmit={omSubmitHandler} className='flex flex-col gap-5 w-full max-w-lg'>
                    <input type="text" name="name" id="name" placeholder='Name' className='border border-gray-400 rounded-md py-2 px-2 sm:px-4 focus:outline-gray-200' />
                    <input type="text" name="email" id="email" placeholder='Email' className='border border-gray-400 rounded-md py-2 px-2 sm:px-4 focus:outline-gray-200' />
                    <input type="password" name="password" id="password" placeholder='Password' className='border border-gray-400 rounded-md py-2 px-2 sm:px-4 focus:outline-gray-200' />
                    <button type='submit' className='bg-black cursor-pointer text-white py-2 rounded-md'>
                        Sign Up
                    </button>
                    <div className='text-sm flex justify-between'>
                        <NavLink to={'forget-password'}>
                            Forgot your password?
                        </NavLink>
                        <NavLink to={'/login'}>
                            Already have an account
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}
