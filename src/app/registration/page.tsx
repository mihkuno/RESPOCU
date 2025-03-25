import React from 'react';
import Link from 'next/link';

export default function Register() {
    return (
        <div className="relative min-h-screen">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/20" />
                <div 
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "url('/bgMain.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
                <div className="w-full max-w-md bg-white bg-opacity-90 rounded-lg shadow-md overflow-hidden">
                    <div className="relative bg-[#9F1E22] p-6 flex justify-center">
                        <div className="relative w-40 h-40">
                            <img 
                                src="/logo.png" 
                                alt="logo" 
                                className="w-full h-full object-contain" 
                            />
                            <div className="absolute inset-0 flex items-center justify-center mt-17">
                                <h1 className="text-white font-bold text-xs text-center">
                                    Capitol University
                                </h1>
                            </div>
                        </div>
                    </div>

                    {/* Registration Form */}
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Account</h2>
                        
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        required
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#9f1e22e0] focus:border-[#9f1e22e0]"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        required
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#9f1e22e0] focus:border-[#9f1e22e0]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#9f1e22e0] focus:border-[#9f1e22e0]"
                                />
                            </div>

                            <div>
                                <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">
                                    Student ID
                                </label>
                                <input
                                    type="text"
                                    id="studentId"
                                    name="studentId"
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#9f1e22e0] focus:border-[#9f1e22e0]"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#9f1e22e0] focus:border-[#9f1e22e0]"
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#9f1e22e0] focus:border-[#9f1e22e0]"
                                />
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    className="h-4 w-4 text-[#9F1E22] focus:ring-[#9f1e22e0] border-gray-300 rounded"
                                />
                                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                    I agree to the <a href="#" className="text-[#9F1E22] hover:text-[#9f1e22e0]">terms and conditions</a>
                                </label>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#9F1E22] hover:bg-[#9f1e22e0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9f1e22e0]"
                                >
                                    Register
                                </button>
                            </div>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link href="/login" className="font-medium text-[#9F1E22] hover:text-[#9f1e22e0]">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}