import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Loader2, Loader2Icon, Lock, Mail, MessageSquare, User } from 'lucide-react';
import { toast } from 'sonner';

function SignUpPage() {  // Fixed spelling
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const { signup, isSignUp } = useAuthStore();

    const validateForm = (e) => {
        if (!formData.fullName || !formData.email || !formData.password) {
            toast.error('Please fill all the fields');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error('Please enter a valid email');
            return false;
        }
        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);  // Log formData to make sure it's being captured correctly
        const success = validateForm();
        if (success === true) {
            signup(formData);
        }
    }

    return (
        <div className='min-h-screen grid lg:grid-cols-2'>
            {/* Left side  */}
            <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
                <div className='w-full max-w-md space-y-8'>
                    {/* Logo  */}
                    <div className='text-center mb-8'>
                        <div className='flex flex-col items-center gap-2 group'>
                            <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                                <MessageSquare className='size-6 text-primary'></MessageSquare>
                            </div>
                            <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
                            <p className='text-base-content/60'>Get started with your free account</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className='space-y-6'>
                        {/* Full Name */}
                        <div className='form-control'>
                            <label htmlFor="fullName">
                                <span className='label-text font-medium'>Full Name</span>
                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <User className='size-5 text-base-content/40' />
                                </div>
                                <input
                                    type="text"
                                    id="fullName"
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder='aminul haque'
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className='form-control'>
                            <label htmlFor="email">
                                <span className='label-text font-medium'>Email</span>
                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Mail className='size-5 text-base-content/40' />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder='xyz@gmail.com'
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className='form-control'>
                            <label htmlFor="password">
                                <span className='label-text font-medium'>Password</span>
                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Lock className='size-5 text-base-content/40' />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder='..........'
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button
                                    type='button'
                                    className='absolute inset-y-0 right-0 pr-3 flex items-center'
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="size-5 text-base-content/40" /> : <Eye className="size-5 text-base-content/40" />}
                                </button>
                            </div>
                        </div>
                        <button type='submit' className='btn btn-primary w-full' disabled={isSignUp}>
                            {isSignUp ? (
                                <>
                                    <Loader2Icon className='size-5 animate-spin' />
                                    Loading...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;  // Fixed spelling
