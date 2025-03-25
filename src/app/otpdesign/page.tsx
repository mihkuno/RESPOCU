import React from 'react';
import Link from 'next/link';

export default function OTPVerification() {
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
                    {/* Header with Logo */}
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

                    {/* OTP Form */}
                    <div className="p-8">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify Your Account</h2>
                            <p className="text-gray-600">We've sent a 6-digit code to your email</p>
                            <p className="text-gray-600 font-medium">user@email.com</p>
                        </div>

                        <form className="space-y-6">
                            {/* OTP Input Fields */}
                            <div className="flex justify-center space-x-4">
                                {[...Array(6)].map((_, i) => (
                                    <input
                                        key={i}
                                        type="text"
                                        maxLength={1}
                                        className="w-12 h-12 text-2xl text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9F1E22] focus:border-[#9F1E22]"
                                        pattern="\d*"
                                        inputMode="numeric"
                                    />
                                ))}
                            </div>

                            {/* Countdown Timer */}
                            <div className="text-center text-gray-500 text-sm">
                                <p>Code expires in: <span className="font-medium">04:59</span></p>
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#9F1E22] hover:bg-[#9f1e22e0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9F1E22]"
                                >
                                    Verify Account
                                </button>
                            </div>
                        </form>

                        {/* Resend Code Link */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Didn't receive a code?{' '}
                                <button className="font-medium text-[#9F1E22] hover:text-[#9f1e22e0] focus:outline-none">
                                    Resend Code
                                </button>
                            </p>
                        </div>

                        {/* Back to Login Link */}
                        <div className="mt-4 text-center">
                            <Link href="/login">
                                <span className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer">
                                    ← Back to Login
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}