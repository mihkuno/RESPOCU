"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  HomeIcon, 
  BookOpenIcon, 
  ArchiveBoxIcon, 
  UserIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightOnRectangleIcon as LogoutIcon } from '@heroicons/react/24/outline';
import { useProfile } from '@/providers/profileContext';

// Sidebar component with logout modal integration
interface SidebarProps {
  onLogoutClick: () => void;
  setActiveMenuItem: (menuItem: string) => void;
  activeMenuItem: string;
}

export default function Sidebar({ 
  onLogoutClick, 
  setActiveMenuItem, 
  activeMenuItem 
}: SidebarProps) {
  const { profile } = useProfile();
  const { isAdmin } = profile;
  
  // Brand colors matching landing page
  const brandMaroon = '#9F1E22';

  let menuItems;
  if (isAdmin) {
    menuItems = [
      { name: 'Home', icon: HomeIcon, href: '/dashboard' },
      { name: 'Publications', icon: BookOpenIcon, href: '/dashboard/publications' },
      { name: 'Archive', icon: ArchiveBoxIcon, href: '/dashboard/archive' },
      { name: 'Accounts', icon: UserIcon, href: '/dashboard/accounts' },
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