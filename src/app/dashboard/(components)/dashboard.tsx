"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useProfile } from '@/providers/profileContext';
import { logoutAction } from '@/actions/auth';
import Modal from './modal';
import Sidebar from './sidebar';

// Client component that handles state and interactivity
export default function DashboardClient({ children }: { children: React.ReactNode }) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('Home');

  // Brand colors matching landing page
  const brandMaroon = '#9F1E22';
  const brandYellow = '#FFB81C';

  const handleLogout = async () => {
    await logoutAction();
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Abstract Background Lines (similar to landing page) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Maroon abstract lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,30 Q25,10 50,30 T100,30" stroke={brandMaroon} strokeWidth="0.2" fill="none" opacity="0.1" />
          <path d="M0,50 Q35,30 70,50 T100,50" stroke={brandMaroon} strokeWidth="0.3" fill="none" opacity="0.07" />
          <path d="M0,65 Q40,85 60,65 T100,65" stroke={brandMaroon} strokeWidth="0.2" fill="none" opacity="0.1" />
        </svg>
        
        {/* Yellow abstract lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,20 Q40,40 80,20 T100,20" stroke={brandYellow} strokeWidth="0.3" fill="none" opacity="0.1" />
          <path d="M0,60 Q30,40 70,60 T100,60" stroke={brandYellow} strokeWidth="0.3" fill="none" opacity="0.1" />
        </svg>
        
        {/* Abstract geometric elements */}
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-yellow-500 rounded-full opacity-5"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 border-2 border-red-900 rounded-full opacity-5"></div>
      </div>

      <Sidebar 
        onLogoutClick={() => setIsLogoutModalOpen(true)} 
        setActiveMenuItem={setActiveMenuItem} 
        activeMenuItem={activeMenuItem}
      />
      
      <main className="flex-1 overflow-auto relative">
        <div className="relative z-10">
          <div className="min-h-screen p-18">
            <div className="container mx-auto">
              <header className="mb-10">
                <div className="bg-gradient-to-r from-red-900 to-red-800 h-2 w-24 mb-4"></div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {activeMenuItem} <span className="text-red-900">Dashboard</span>
                </h1>
                <p className="text-gray-600 mt-2">
                  Manage and explore your academic research collection
                </p>
              </header>

              {children}
            </div>
          </div>
        </div>
      </main>

      {/* Logout Modal */}
      <Modal 
        isOpen={isLogoutModalOpen}
        type="confirmation"
        title="Logout Confirmation"
        message="Are you sure you want to log out?"
        onConfirm={handleLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
    </div>
  );
}