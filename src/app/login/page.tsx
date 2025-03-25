import React from 'react';
import Link from 'next/link';

export default function Login() {
    return (
        <div className="relative min-h-screen">
            {/* Background with black tint overlay */}
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

                    {/* Login Form */}
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
                        
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
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

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-[#9F1E22] focus:ring-[#9f1e22e0] border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="font-medium text-[#9F1E22] hover:text-[#9f1e22e0]">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#9F1E22] hover:bg-[#9f1e22e0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <Link href="/registration" className="font-medium text-[#9F1E22] hover:text-[#9f1e22e0]">
                                    Register
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}