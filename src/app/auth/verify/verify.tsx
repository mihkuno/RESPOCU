"use client"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useCookies } from 'next-client-cookies'
import { validateVerifyToken } from '@/actions/auth';
import { validateForgotToken } from '@/actions/auth';

export default function Verification({ initialState = 'default' }
: { initialState: 'default' | 'loading' | 'verified' | 'invalid', }
) {
    // State management for different verification states
    const [verificationState, setVerificationState] = useState(initialState);
    const [email, setEmail] = useState('user@email.com');
    const searchParams = useSearchParams();
    const router = useRouter();
    const cookies = useCookies();

    const handleVerify = async (token: string) => {
        const response = await validateVerifyToken(token);

        if (response && response.status === 'valid') {
            
            setTimeout(() => {
                // Redirect to login page after verification
                router.push('/dashboard');
            }, 1000);

            setVerificationState('verified');
        }
        else {
            setVerificationState('invalid');
        }
    }

    const handleForgot = async (token: string) => {
        const response = await validateForgotToken(token);
        
        if (response && response.status === 'valid') {
            setTimeout(() => {
                // Redirect to login page after verification
                router.push('/auth/login?authState=signup');
            }, 1000);

            setVerificationState('verified');
        }
        else {
            setVerificationState('invalid');
        }
    }

    useEffect(() => {
        const email_to_verify = cookies.get('email_to_verify');
        if (email_to_verify) {
            setEmail(email_to_verify);
        }

        const token = searchParams.get('token');
        const forgot = searchParams.get('forgot');
        

        if (token) {
            setVerificationState('loading');

            if (forgot) {
                handleForgot(token);
            }
            
            else {
                handleVerify(token);
            }

        }

    }, []);
    
    // Content based on verification state
    const renderContent = () => {
        switch (verificationState) {
            case 'loading':
                return (
                    <>
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">Verifying Your Account</h2>
                            <p className="text-gray-600">Please wait while we verify your email</p>
                        </div>
                        
                        {/* Loading Spinner */}
                        <div className="flex justify-center mb-8">
                            <div className="p-4 bg-yellow-50 rounded-full relative">
                                <svg className="h-16 w-16 text-yellow-500 opacity-25" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="animate-ping absolute h-8 w-8 rounded-full bg-yellow-400 opacity-20"></span>
                                    <span className="relative rounded-full h-4 w-4 bg-yellow-500"></span>
                                </div>
                            </div>
                        </div>
                    </>
                );
                
            case 'verified':
                return (
                    <>
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">Email Verified!</h2>
                            <p className="text-gray-600 mb-1">Your account has been successfully verified</p>
                        </div>
                        
                        {/* Success Icon */}
                        <div className="flex justify-center mb-8">
                            <div className="p-4 bg-green-50 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </>
                );
                
            case 'invalid':
                return (
                    <>
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">Invalid Verification</h2>
                            <p className="text-gray-600 mb-1">The verification link is invalid or expired</p>
                        </div>
                        
                        {/* Error Icon */}
                        <div className="flex justify-center mb-8">
                            <div className="p-4 bg-red-50 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>

                        
                        <div className="text-center mb-8">
                        </div>
                        
                        {/* Back to Login Link - visible in all states */}
                        <div className="mt-6 text-center">
                            <Link href="/auth/login" className="inline-flex items-center text-sm text-gray-600 hover:text-red-900 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Login
                            </Link>
                        </div>
                    </>
                );
                
            default:
                return (
                    <>
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">Verify Your Account</h2>
                            <p className="text-gray-600 mb-1">We've sent a verification link to your email</p>
                            <p className="text-gray-700 font-medium">{email}</p>
                        </div>

                        {/* Email Illustration */}
                        <div className="flex justify-center mb-8">
                            <div className="p-4 bg-yellow-50 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>

                        
                        {/* Back to Login Link - visible in all states */}
                        <div className="mt-6 text-center">
                            <Link href="/auth/login" className="inline-flex items-center text-sm text-gray-600 hover:text-red-900 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Login
                            </Link>
                        </div>
                    </>
                );
        }
    };
    
    return (

        <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden border border-gray-100 relative z-10">
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-2"></div>
        
            {/* OTP Form */}
            <div className="p-8">
                {renderContent()}
            </div>
            
            <div className="bg-gradient-to-r from-red-900 to-red-800 h-2"></div>
        </div>

    );
}