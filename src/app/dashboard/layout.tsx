"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  HomeIcon, 
  BookOpenIcon, 
  BookmarkIcon, 
  ArchiveBoxIcon, 
  UserIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightOnRectangleIcon as LogoutIcon } from '@heroicons/react/24/outline';
import LogoutModal from '@/component/logoutModal'; 

// Parent layout component
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    console.log("User logged out");
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="flex h-screen">
      <Sidebar onLogoutClick={() => setIsLogoutModalOpen(true)} />
      <main className="flex-1 overflow-auto">
        {children}
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
function Sidebar({ onLogoutClick }: { onLogoutClick: () => void }) {
  const menuItems = [
    { name: 'Home', icon: HomeIcon, href: '/dashboard' },
    { name: 'Publications', icon: BookOpenIcon, href: '/dashboard/publications' },
    { name: 'Bookmark', icon: BookmarkIcon, href: '/dashboard/bookmarks' },
    { name: 'Archive', icon: ArchiveBoxIcon, href: '/dashboard/archive' },
    { name: 'User', icon: UserIcon, href: '/dashboard/users' },
  ];

  return (
    <div 
      className="w-64 flex flex-col justify-between" 
      style={{ backgroundColor: '#292F36' }}
    >
      <div>
        {/* Logo */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-center">
            <div className="relative w-10 h-10 mr-2">
              <img 
                src="/logo.png" 
                alt="logo" 
                className="w-full h-full object-contain" 
              />
            </div>
            <h1 className="text-white font-bold text-lg">Capitol University</h1>
          </div>
        </div>

        {/* Main Menu */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link href={item.href}>
                  <div className="flex items-center p-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
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
      <div className="p-4 border-t border-gray-700">
        <ul className="space-y-2">
          <li>
            <button
              onClick={onLogoutClick}
              className="w-full flex items-center p-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              <LogoutIcon className="h-5 w-5 mr-3" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}