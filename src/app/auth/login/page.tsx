import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Login() {
    return (
        <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden border border-gray-100 relative z-10">
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-2"></div>
            <div className="p-8">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <div className="relative w-64 h-20">
                        <Image 
                            src="/logo.png" 
                            alt="EduChest logo" 
                            fill
                            priority
                            className="object-contain" 
                        />
                    </div>
                </div>

                {/* Login Form */}
                <form className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                placeholder="your@email.com"
                                className="block w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-red-900 transition-colors bg-white/80"
                                aria-describedby="email-error"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            {/* <Link href="/forgot-password" className="text-xs font-medium text-red-900 hover:text-red-700 transition-colors">
                                Forgot password?
                            </Link> */}
                        </div>
                        <div className="relative">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                placeholder="••••••••"
                                className="block w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-red-900 transition-colors bg-white/80"
                                aria-describedby="password-error"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-red-900 border-gray-300 rounded focus:ring-red-900"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                            Remember me
                        </label>
                    </div> */}

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-red-900 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-900 transition-all"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                {/* Sign up link */}
                {/* <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link href="/register" className="font-medium text-yellow-600 hover:text-yellow-700 transition-colors">
                            Sign up
                        </Link>
                    </p>
                </div> */}
            </div>
            <div className="bg-gradient-to-r from-red-900 to-red-800 h-2"></div>
        </div>

    );
}