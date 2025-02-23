'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ClipboardList, Home, LayoutDashboard, MapPin, Users, Phone } from 'lucide-react';

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'bg-primary/10' : '';
  };

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center px-2 text-xl font-bold">
              <MapPin className="h-6 w-6 mr-2" />
              CivicWatch
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              href="/"
              className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive(
                '/'
              )}`}
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Link>
            <Link
              href="/report"
              className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive(
                '/report'
              )}`}
            >
              <ClipboardList className="h-4 w-4 mr-2" />
              Report Issue
            </Link>
            <Link
              href="/dashboard"
              className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive(
                '/dashboard'
              )}`}
            >
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </Link>
            <Link
              href="/about"
              className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive(
                '/about'
              )}`}
            >
              <Users className="h-4 w-4 mr-2" />
              About Us
            </Link>
            <Link
              href="/contact"
              className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive(
                '/contact'
              )}`}
            >
              <Phone className="h-4 w-4 mr-2" />
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;