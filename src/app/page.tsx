import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
    // EduChest brand colors based on the logo
    const brandMaroon = '#9F1E22';
    const brandYellow = '#FFB81C';
    
    return (
        <div className="relative min-h-screen bg-slate-50 overflow-hidden">
            {/* Abstract Background Lines */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Maroon abstract lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,30 Q25,10 50,30 T100,30" stroke={brandMaroon} strokeWidth="0.2" fill="none" opacity="0.2" />
                    <path d="M0,35 Q25,55 50,35 T100,35" stroke={brandMaroon} strokeWidth="0.2" fill="none" opacity="0.15" />
                    <path d="M0,50 Q35,30 70,50 T100,50" stroke={brandMaroon} strokeWidth="0.3" fill="none" opacity="0.1" />
                    <path d="M0,65 Q40,85 60,65 T100,65" stroke={brandMaroon} strokeWidth="0.2" fill="none" opacity="0.2" />
                    <path d="M0,90 Q30,70 60,90 T100,90" stroke={brandMaroon} strokeWidth="0.4" fill="none" opacity="0.1" />
                </svg>
                
                {/* Yellow abstract lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,20 Q40,40 80,20 T100,20" stroke={brandYellow} strokeWidth="0.3" fill="none" opacity="0.15" />
                    <path d="M0,40 Q60,20 80,40 T100,40" stroke={brandYellow} strokeWidth="0.2" fill="none" opacity="0.1" />
                    <path d="M0,60 Q30,40 70,60 T100,60" stroke={brandYellow} strokeWidth="0.3" fill="none" opacity="0.15" />
                    <path d="M0,80 Q45,60 90,80 T100,80" stroke={brandYellow} strokeWidth="0.2" fill="none" opacity="0.1" />
                </svg>
                
                {/* Abstract geometric elements */}
                <div className="absolute top-20 left-20 w-32 h-32 border-2 border-yellow-500 rounded-full opacity-5"></div>
                <div className="absolute bottom-20 right-20 w-64 h-64 border-2 border-red-900 rounded-full opacity-5"></div>
                <div className="absolute top-1/3 right-1/4 w-24 h-24 border-2 border-yellow-400 rotate-45 opacity-5"></div>
            </div>
            
            
            {/* Hero Section */}
            <div className="relative z-10 pt-16 pb-20 md:pt-24 md:pb-28 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Hero Content */}
                        <div>
                            <div className="bg-gradient-to-r from-red-900 to-red-800 h-2 w-24 mb-8"></div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                EduChest <span className="text-red-900">Research Repository</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8">
                                Empowering Senior High Students with access to curated research papers and educational resources.
                            </p>
                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                <Link href="/auth/login">
                                    <button className="px-8 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-red-900 hover:bg-red-800 transition-all shadow-md">
                                        Explore Resources
                                    </button>
                                </Link>
                                <Link href="/about">
                                    <button className="px-8 py-3 border border-yellow-500 rounded-lg text-base font-medium text-yellow-600 hover:bg-yellow-50 transition-all">
                                        Learn More
                                    </button>
                                </Link>
                            </div>
                        </div>
                        
                        {/* Right Column - Logo Image */}
                        <div className="flex justify-center">
                            <div className="relative w-64 h-64 md:w-80 md:h-80">
                                <Image 
                                    src="/hero.png" 
                                    alt="EduChest logo" 
                                    fill
                                    priority
                                    className="object-contain" 
                                />
                                {/* The logo image can be replaced with the uploaded maroon and gold graduate cap and book logo */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Features Section */}
            <div className="relative z-10 bg-slate-100/80 backdrop-blur-sm py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Use EduChest?</h2>
                        <div className="h-1 w-24 bg-yellow-500 mx-auto"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-6 border border-gray-100">
                            <div className="p-3 bg-red-50 rounded-full inline-block mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Discover Research</h3>
                            <p className="text-gray-600">Access a vast collection of research papers and resources from various academic disciplines.</p>
                        </div>
                        
                        {/* Feature 2 */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-6 border border-gray-100">
                            <div className="p-3 bg-yellow-50 rounded-full inline-block mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Learn &amp; Grow</h3>
                            <p className="text-gray-600">Enhance your academic skills and knowledge with high-quality educational materials.</p>
                        </div>
                        
                        {/* Feature 3 */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-6 border border-gray-100">
                            <div className="p-3 bg-red-50 rounded-full inline-block mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Connect</h3>
                            <p className="text-gray-600">Engage with a community of scholars and fellow students from Capitol University.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* CTA Section */}
            <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto bg-gradient-to-r from-red-900 to-red-800 rounded-xl shadow-xl overflow-hidden">
                    <div className="px-6 py-12 md:px-12 md:py-16 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
                        <p className="text-red-100 mb-8 max-w-lg mx-auto">
                            Join Capitol University's digital research repository today and unlock a world of academic resources.
                        </p>
                        <div className="flex justify-center">
                            <Link href="/login">
                                <button className="px-8 py-3 border border-transparent rounded-lg text-base font-bold text-red-900 bg-yellow-400 hover:bg-yellow-300 transition-all shadow-md">
                                    Login with University Email
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Footer */}
            <footer className="relative z-10 bg-white/90 backdrop-blur-sm border-t border-gray-100 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <div className="relative w-40 h-10">
                                <Image 
                                    src="/logo.png" 
                                    alt="EduChest logo" 
                                    fill
                                    priority
                                    className="object-contain" 
                                />
                            </div>
                        </div>
                        <div className="text-center md:text-right text-sm text-gray-600">
                            <p>© {new Date().getFullYear()} Capitol University. All rights reserved.</p>
                            <p className="mt-1">EduChest - Research Repository for Senior High Students</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}