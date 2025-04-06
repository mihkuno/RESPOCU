"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { loginAction, signupAction, forgotAction } from '@/actions/auth';
import { useSearchParams } from 'next/navigation';


export default function AuthForm() {

    // login is the default
    // authState is passed as a query parameter in the URL
    const searchParams = useSearchParams();
    let authState = searchParams.get('authState') as 'login' | 'signup' | 'forgot';
    // check if authstate has login, signup or forgot
    if (authState !== 'login' && authState !== 'signup' && authState !== 'forgot') {
        authState = 'login';
    }

    // State for form mode and validation
    const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(authState);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Reset errors
        setErrors({});
        
        // Validate form
        let valid = true;
        const newErrors: Record<string, string> = {};
        
        if (!email) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email address';
            valid = false;
        }
        
        if (mode !== 'forgot') {
            if (!password) {
                newErrors.password = 'Password is required';
                valid = false;
            } else if (password.length < 8) {
                newErrors.password = 'Password must be at least 8 characters';
                valid = false;
            }
            
            if (mode === 'signup') {
                if (!confirmPassword) {
                    newErrors.confirmPassword = 'Please confirm your password';
                    valid = false;
                } else if (confirmPassword !== password) {
                    newErrors.confirmPassword = 'Passwords do not match';
                    valid = false;
                }
            }
        }
        
        if (!valid) {
            setErrors(newErrors);
            return;
        }
        
        // Form is valid, show loading state
        setIsLoading(true);
        
        try {
            // Form is valid, submit based on mode
            const formData = new FormData(e.target as HTMLFormElement);

            if (mode === 'login') {
                const response = await loginAction(formData);
                if (response.error) {
                    setServerError(response.error);
                }
            } 
            else if (mode === 'signup') {
                const response = await signupAction(formData);
                if (response.error) {
                    setServerError(response.error);
                }
            }   

            else if (mode === 'forgot') {
                const response = await forgotAction(formData);
                if (response.error) {
                    setServerError(response.error);
                }
            }
            
            // Simulate API call delay for demonstration purposes
            await new Promise(resolve => setTimeout(resolve, 1000));
        } 
        
        catch (error) {
            console.error('Authentication error:', error);
        } 
        
        finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden border border-gray-100 relative z-10">
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-2"></div>
            <div className="p-8">
                {/* Logo */}
                <div className="flex justify-center mb-6">
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

                {/* Server-side Error Message */}
                {serverError && (
                    <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
                        <p className="text-sm">{serverError}</p>
                    </div>
                )}

                {/* Authentication Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Form Title */}
                    {/* <h2 className="text-2xl font-bold text-center text-gray-800">
                        {mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Reset Password'}
                    </h2> */}

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                className={`block w-full px-4 py-3 pl-10 border ${
                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-red-900 transition-colors bg-white/80`}
                                disabled={isLoading}
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                            </div>
                        </div>
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                    </div>

                    {/* Password Field - Only for Login and Signup */}
                    {mode !== 'forgot' && (
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                {mode === 'login' && (
                                    <button 
                                        type="button"
                                        onClick={() => setMode('forgot')}
                                        className="text-xs text-red-800 hover:text-red-900"
                                        disabled={isLoading}
                                    >
                                        Forgot password?
                                    </button>
                                )}
                            </div>
                            <div className="relative">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className={`block w-full px-4 py-3 pl-10 border ${
                                        errors.password ? 'border-red-500' : 'border-gray-300'
                                    } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-red-900 transition-colors bg-white/80`}
                                    disabled={isLoading}
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>
                    )}

                    {/* Confirm Password Field - Only for Signup */}
                    {mode === 'signup' && (
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className={`block w-full px-4 py-3 pl-10 border ${
                                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                    } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-red-900 transition-colors bg-white/80`}
                                    disabled={isLoading}
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                            )}
                        </div>
                    )}

                    {/* Forgot Password Instructions */}
                    {mode === 'forgot' && (
                        <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                            Enter your email address and we'll send you instructions to reset your password.
                        </div>
                    )}

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-medium text-white 
                                ${isLoading ? 'bg-red-700 cursor-not-allowed' : 'bg-red-900 hover:bg-red-800'} 
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-900 transition-all`}
                        >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {mode === 'login' ? 'Signing In...' : mode === 'signup' ? 'Creating Account...' : 'Sending Reset Link...'}
                                </div>
                            ) : (
                                mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Reset Password'
                            )}
                        </button>
                    </div>

                    {/* Mode Toggle Links */}
                    <div className="text-center text-sm">
                        {mode === 'login' && (
                            <p className="text-gray-600">
                                Don't have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => setMode('signup')}
                                    className="text-red-800 hover:text-red-900 font-medium"
                                    disabled={isLoading}
                                >
                                    Sign up
                                </button>
                            </p>
                        )}
                        
                        {mode === 'signup' && (
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => setMode('login')}
                                    className="text-red-800 hover:text-red-900 font-medium"
                                    disabled={isLoading}
                                >
                                    Sign in
                                </button>
                            </p>
                        )}
                        
                        {mode === 'forgot' && (
                            <button
                                type="button"
                                onClick={() => setMode('login')}
                                className="text-red-800 hover:text-red-900"
                                disabled={isLoading}
                            >
                                Back to Sign In
                            </button>
                        )}
                    </div>
                </form>
            </div>
            <div className="bg-gradient-to-r from-red-900 to-red-800 h-2"></div>
        </div>
    );
}