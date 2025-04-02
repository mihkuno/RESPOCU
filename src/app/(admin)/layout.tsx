"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  BookOpenIcon,
  BookmarkIcon,
  ArchiveBoxIcon,
  UserIcon,
  UserCircleIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  BookOpenIcon as BookOpenIconSolid,
  BookmarkIcon as BookmarkIconSolid,
  ArchiveBoxIcon as ArchiveBoxIconSolid,
  UserIcon as UserIconSolid,
} from '@heroicons/react/24/solid';
import { ArrowRightOnRectangleIcon as LogoutIcon } from '@heroicons/react/24/outline';
import LogoutModal from '@/component/logoutModal';

// Parent layout component
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const brandMaroon = '#9F1E22';

  const handleLogout = () => {
    console.log("User logged out");
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <nav
        style={{ backgroundColor: brandMaroon }}
        className="px-4 py-2 shadow-md z-10"
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo in left side */}
          <div className="flex items-center">
            <div className="relative h-10 w-10 mr-2">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-full h-full object-contain bg-white rounded-full p-1"
              />
            </div>
            <span className="text-white font-bold text-lg hidden sm:block">Capitol University</span>
          </div>

          {/* Profile and Email section */}
          <div className="flex items-center text-white">
            <UserCircleIcon className="h-8 w-8 mr-2" />
            <div className="hidden md:block text-left">
              <div className="font-medium">John Doe</div>
              <div className="text-xs text-gray-200 flex items-center">
                <EnvelopeIcon className="h-3 w-3 mr-1" />
                john.doe@example.com
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
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
    </div>
  );
}

// Sidebar component with logout modal integration and active page highlighting
function Sidebar({ onLogoutClick }: { onLogoutClick: () => void }) {
  const currentPath = usePathname();

  const menuItems = [
    {
      name: 'Home',
      icon: HomeIcon,
      activeIcon: HomeIconSolid,
      href: '/home'
    },
    {
      name: 'Publications',
      icon: BookOpenIcon,
      activeIcon: BookOpenIconSolid,
      href: '/publications'
    },
    {
      name: 'Bookmark',
      icon: BookmarkIcon,
      activeIcon: BookmarkIconSolid,
      href: '/bookmarks'
    },
    {
      name: 'Archive',
      icon: ArchiveBoxIcon,
      activeIcon: ArchiveBoxIconSolid,
      href: '/archive'
    },
    {
      name: 'User',
      icon: UserIcon,
      activeIcon: UserIconSolid,
      href: '/users'
    },
  ];

  // Check if the current path matches or starts with the menu item's href
  const isActive = (href: string) => {
    return currentPath === href || currentPath.startsWith(href);
  };

  return (
    <div
      className="w-64 flex flex-col justify-between"
      style={{ backgroundColor: '#292F36' }}
    >
      <div>
        {/* Main Menu */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const active = isActive(item.href);
              const Icon = active ? item.activeIcon : item.icon;

              return (
                <li key={index}>
                  <Link href={item.href}>
                    <div className={`flex items-center p-3 rounded-lg transition-colors ${active
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                      }`}>
                      <Icon className="h-5 w-5 mr-3" />
                      <span className={active ? 'font-medium' : ''}>{item.name}</span>
                      {active && (
                        <div className="ml-auto w-1 h-5 bg-white rounded-full"></div>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

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