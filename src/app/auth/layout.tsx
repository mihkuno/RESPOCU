import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Login({ children } : { children: React.ReactNode }) {
    // EduChest brand colors based on the logo
    const brandMaroon = '#9F1E22';
    const brandYellow = '#FFB81C';
    
    return (
        <div className="relative min-h-screen bg-slate-50 flex items-center justify-center p-6 overflow-hidden">
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
            
            {/* Content */}
            { children }
        </div>
    );
}