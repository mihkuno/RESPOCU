import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Half - Red Background */}
      <div 
        className="w-full md:w-1/2 flex items-center justify-center p-8"
        style={{ backgroundColor: '#9F1E22' }}
      >
        <div className="text-center">
          {/* Logo */}
          <div className="relative mx-auto w-48 h-48 mb-4">
            <img 
              src="/logo.png" 
              alt="Capitol University Logo" 
              className="w-full h-full object-contain" 
            />
            {/* Optional: If you want text over the logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-lg">CU</span>
            </div>
          </div>
          
          {/* Capitol University Text */}
          <h1 className="text-white text-3xl font-bold mb-2">CAPITOL UNIVERSITY</h1>
        </div>
      </div>

      {/* Right Half - Content */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md">
          {/* Main Heading */}
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Research Repository
          </h1>
          
          {/* Subheading */}
          <p className="text-lg text-gray-600 mb-8">
            Curated for Capitol University Senior High Students
          </p>
          
          {/* Get Started Button */}
          <Link href="/login">
            <button className="px-8 py-3 bg-[#9F1E22] text-white font-semibold rounded-lg hover:bg-[#8a1a1e] transition-colors">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}


