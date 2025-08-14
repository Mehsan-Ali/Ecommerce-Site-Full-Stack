import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Title } from '../components/Title'
import { client } from '../APIs/client';
import { toast } from 'react-toastify';

interface SignAuth {
    name: string;
    email: string;
    password: string;
}

export const Signup = () => {
    const [formData, setFormData] = useState<SignAuth>({ name: '', email: '', password: '' })
    const navg = useNavigate()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const omSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await client.post('/api/user/register',formData,{
                withCredentials: true
            })
            const respData = response.data
            if(respData.success){
                toast.success(respData.message)
                navg('/login')
            }
        } catch (error:any) {
            console.error({erro: error});
            toast.error(error.response?.data?.message || error)
        }
    }
    return (
        <div>
            <div className='flex flex-col justify-center items-center min-h-screen'>
                <div className='font-light text-4xl w-full max-w-lg text-center py-10'>
                    <Title text1='Signup' text2='' />
                </div>
                <form onSubmit={omSubmitHandler} className='flex flex-col gap-5 w-full max-w-lg'>
                    <input onChange={handleChange} value={formData.name} type="text" name="name" id="name" placeholder='Name' className='border border-gray-400 rounded-md py-2 px-2 sm:px-4 focus:outline-gray-200' />
                    <input onChange={handleChange} value={formData.email} type="text" name="email" id="email" placeholder='Email' className='border border-gray-400 rounded-md py-2 px-2 sm:px-4 focus:outline-gray-200' />
                    <input onChange={handleChange} value={formData.password} type="password" name="password" id="password" placeholder='Password' className='border border-gray-400 rounded-md py-2 px-2 sm:px-4 focus:outline-gray-200' />
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
