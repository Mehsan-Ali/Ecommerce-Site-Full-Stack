import React, { useState } from 'react'

export const NewsLetter = () => {
    const [email, setEmail] = useState('')
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you might want to add logic to send the email to your backend
        console.log('Email submitted:', email);
    };
    return (
        <div className='text-center py-8 space-y-5'>
            <p className='text-2xl font-medium text-gray-900'>Subscribe now and get 20% off</p>
            <p className='text-sm font-medium text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis delectus alias magnam?</p>

            <div>
                <form action="" className='flex justify-center' onSubmit={handleSubmit}>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} name="email" id="email" className='border placeholder:font-medium border-gray-200 outline-none px-3 py-3 w-auto md:w-1/3' placeholder='Enter your email' />
                    <button className='bg-black py-4 text-white px-6 text-2xs sm:text-xs uppercase'>Subscribe</button>
                </form>
            </div>
        </div>
    )
}
