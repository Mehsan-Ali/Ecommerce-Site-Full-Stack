import axios from 'axios';
import { EyeClosed, EyeIcon } from 'lucide-react';
import { useState } from 'react';
import { backednUrl } from '../App';
import { toast } from 'react-toastify';

export const Login = ({ seToken }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const omSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const resp = await axios.post(`${backednUrl}/api/user/admin`, { email, password })
            const dataa = resp.data
            if (dataa.success) {
                seToken(dataa.token)
                localStorage.setItem('token', dataa.token)
                toast.success(dataa.message)
            }
            // alert('Login Successfull')
            console.log(dataa)
        } catch (error: any) {
            toast.error(error.response.data.message)
            console.error(error);
        }
    }
    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>
            <div className='font-medium text-4xl max-w-lg text-center py-10'>
                <h1 className='text-gray-600'>Admin Panel</h1>
                <hr className='text-gray-200 mt-1' />
            </div>
            <form onSubmit={omSubmitHandler} className='flex flex-col gap-5 w-full max-w-lg'>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" name="email" id="email" placeholder='abc@email.com' className='border border-gray-400 rounded-md py-2.5 px-2 sm:px-4 focus:outline-gray-200 text-gray-600' />
                <div className='relative'>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type={showPassword ? 'text' : 'password'} name="password" id="password" placeholder='Enter Your Password' className='border border-gray-400 rounded-md py-2.5 px-2 sm:px-4 focus:outline-gray-200 w-full text-gray-600' />
                    <span className='absolute top-3 right-3 cursor-pointer' onClick={() => setShowPassword(!showPassword)} title='Show Password'>
                        {
                            showPassword ?
                                <EyeClosed className='text-gray-600' /> :
                                <EyeIcon className='text-gray-600' />
                        }
                    </span>
                </div>

                <button type='submit' className='bg-black cursor-pointer text-white py-2 rounded-md'>
                    Log In
                </button>
                {/* <div className='text-sm flex justify-between'>
                    <NavLink to={'forget-password'}>
                        Forgot your password?
                    </NavLink>
                    <NavLink to={'/signup'}>
                        Create Account
                    </NavLink>
                </div> */}
            </form>
        </div>
    )
}
