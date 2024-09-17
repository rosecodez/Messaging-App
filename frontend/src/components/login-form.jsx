import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginError, setLoginError] = useState('');

    const loginUser = async (credentials) => {
        try {
            const response = await fetch("http://localhost:3000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
                credentials: 'include',
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                setLoginError(`Login failed: ${errorData.message}`);
            }
            const data = await response.json();
            console.log("Login response data:", data);
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.user.id);
            navigate("/profile");
        } catch (error) {
            console.error("Error logging in:", error.message);
        }
    };

    const onSubmit = (data) => {
        setLoginError('');
        console.log("Form data submitted:", data);
        loginUser(data);
    };
    
    return (
        <div className="flex flex-col">

            <div id="login-container" className='pt-5'>
                <h6>Don't have an account?</h6>
                <a href='/sign-up'>
                    <button className='mt-3 bg-blue-500 hover:bg-indigo-600 text-white font-bold mb-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Sign up</button>
                </a>
            </div>

            <form id="login-form" className='flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit(onSubmit)}>

                <input className='shadow appearance-none border rounded w-full py-2 px-3 mb-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" {...register("username", { required: true })} placeholder="Username" />
                {errors.username && <span style={{ color: "red" }}>Username is required</span>}

                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="password" {...register("password", { required: true })} placeholder="Password" />
                {errors.password && <span style={{ color: "red" }}>Password is required</span>}

                {loginError && <span className='pt-4' style={{ color: "red"}}>{loginError}</span>}

                <button className='mt-6 bg-blue-500 hover:bg-indigo-600 text-white font-bold mb-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline' type="submit">Log in</button>
            </form>
        </div>
    );
}