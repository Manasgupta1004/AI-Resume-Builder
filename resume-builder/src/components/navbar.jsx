import React from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'

const navbare = () => {
    const user = {
        name: "John Doe",
    }
    const Navigate = useNavigate()
    const logoutuser = () => {
        const confirm = window.confirm("Are you sure to logout your account")
        if (confirm) {
            Navigate('/')
        }
    }
    return (
        <div className='shadow bg-white '>
            <nav className='flex items-center justify-between max-w-7xl mx-auto  px-4 py-3.5  transition-all'>
                <Link to='/'>
                    <h1 className='text-5xl font-semibold'>resume<span className='text-green-600'>.</span></h1>
                </Link>
                <div className='flex items-center gap-4 text-sm'>
                    <p className='max-sm:hidden'>Hi,{user?.name}</p>
                    <button onClick={() => {
                        logoutuser()
                    }} className='bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 
            rounded-full active:scale-95 transition-all'>Logout</button>
                </div>
            </nav>
        </div>
    )
}

export default navbare
