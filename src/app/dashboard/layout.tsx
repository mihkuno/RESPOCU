"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  HomeIcon, 
  BookOpenIcon, 
  BookmarkIcon, 
  ArchiveBoxIcon, 
  UserIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightOnRectangleIcon as LogoutIcon } from '@heroicons/react/24/outline';
import LogoutModal from '@/component/logoutModal'; 
import { useProfile } from '@/providers/profileContext';

// Parent layout component
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('Home'); // State to track active menu item

  // Brand colors matching landing page
  const brandMaroon = '#9F1E22';
  const brandYellow = '#FFB81C';

  const handleLogout = () => {
    console.log("User logged out");
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

      <Sidebar onLogoutClick={() => setIsLogoutModalOpen(true)} setActiveMenuItem={setActiveMenuItem} activeMenuItem={activeMenuItem}/>
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
      
      <LogoutModal 
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onLogout={handleLogout}
      />
    </div>
  );
}

// Sidebar component with logout modal integration
function Sidebar({ onLogoutClick, setActiveMenuItem, activeMenuItem }: { onLogoutClick: () => void, setActiveMenuItem: (item: string) => void, activeMenuItem: string }) {
  
  const { profile } = useProfile();
  const { isAdmin } = profile;
  
  // Brand colors matching landing page
  const brandMaroon = '#9F1E22';
  const brandYellow = '#FFB81C';

  let menuItems;
  if (isAdmin) {
    menuItems = [
      { name: 'Home', icon: HomeIcon, href: '/dashboard' },
      { name: 'Publications', icon: BookOpenIcon, href: '/dashboard/publications' },
      { name: 'Archive', icon: ArchiveBoxIcon, href: '/dashboard/archive' },
      { name: 'Accounts', icon: UserIcon, href: '/dashboard/users' },
    ];
  } else {
    menuItems = [
      { name: 'Home', icon: HomeIcon, href: '/dashboard' },
    ];
  }

  return (
    <div className="w-64 flex flex-col justify-between shadow-lg relative z-20 bg-white border-r border-gray-200">
      <div>
        {/* Logo with brand-colored accent */}
        <div className="p-4 border-b border-gray-200 relative">
          <div className="h-1 w-24 absolute top-0 left-0" style={{ backgroundColor: brandMaroon }}></div>
          <div className="flex items-center justify-center">
            <div className="relative w-40 h-16 mr-2">
              <Image 
                src="/logo.png" 
                alt="EduChest logo" 
                fill
                priority
                className="object-contain" 
              />
            </div>
          </div>
        </div>

        {/* Main Menu */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} onClick={() => setActiveMenuItem(item.name)}>
                  <div 
                    className={`flex items-center p-3 rounded-lg transition-colors font-semibold ${
                      activeMenuItem === item.name
                        ? `bg-red-900 text-white`
                        : `text-gray-700 hover:bg-red-50 hover:text-red-900`
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.name}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom Menu - Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onLogoutClick}
          className="cursor-pointer font-semibold w-full flex items-center p-3 text-gray-700 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogoutIcon className="h-5 w-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}