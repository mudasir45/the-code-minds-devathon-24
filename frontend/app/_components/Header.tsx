'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Logo from '@/app/_assets/logo.png';
import WhatsappIcon from '@/app/_assets/whatsapp.svg';
import Link from 'next/link';
import { useCookies } from 'react-cookie'; // Import useCookies from react-cookie

const Header = () => {
  const [headerOpen, setHeaderOpen] = useState(false);
  const [role, setRole] = useState<string | null>(null); // State to store user role
  const [cookies] = useCookies(['userRole']); // Fetch userRole from cookies

  useEffect(() => {


    // Set user role from cookies
    // setRole(cookies.userRole || null);
    setRole("admin");
  }, [cookies.userRole]);

  const menuLinks = [
    { href: '/', label: 'Home' },
    { href: '/generate-bills', label: 'Generate Bills', roles: ['admin'] },
    { href: '/manage-bills', label: 'Manage Bills', roles: ['admin'] },
    { href: '/manage-users', label: 'Manage Users', roles: ['admin'] },
    { href: '/assist-residents', label: 'Assist Residents', roles: ['customer-support'] },
    { href: '/view-bill-issues', label: 'View Bill Issues', roles: ['customer-support'] },
    { href: '/current-bills', label: 'View Current Bills', roles: ['resident'] },
    { href: '/payment-history', label: 'Payment History', roles: ['resident'] },
    { href: '/make-payment', label: 'Make Payment', roles: ['resident'] },
    { href: '/profile', label: 'Profile', roles: ['resident','admin','customer-support'] },
  ];

  const filteredLinks = menuLinks.filter(link => !link.roles || link.roles.includes(role!));

  return (
    <div
      id="header"
      className={`flex justify-between gap-5 items-center py-1 w-full text-white border-b relative font-bold px-3 lg:px-5 bg-black`}
    >
      <Image src={Logo} alt="logo" className="max-w-16 sm:max-h-12" />
      <div className="hidden lg:flex gap-5 lg:gap-10 text-white font-semibold transition-opacity duration-300">
        {filteredLinks.map(({ href, label }) => (
          <Link key={href} href={href} className="text-white/70 hover:text-white cursor-pointer">
            {label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-5 lg:hidden">
        <div
          onClick={() => setHeaderOpen(!headerOpen)}
          className="p-3 relative cursor-pointer lg:hidden"
        >
          <div
            className={`absolute h-1 ${
              headerOpen ? 'translate-y-0 -rotate-45' : '-translate-y-1'
            } inset-y-auto rounded-lg bg-white w-full left-0 transition-all duration-500`}
          ></div>
          <div
            className={`absolute h-1 ${
              headerOpen ? 'translate-y-0 rotate-45' : 'translate-y-1'
            } inset-y-auto rounded-lg bg-white w-full left-0 transition-all duration-500`}
          ></div>
        </div>
      </div>

      <div
        className={`absolute w-[95%] top-[110%] left-[2.5%] lg:hidden p-5 rounded-lg bg-black flex flex-col justify-around gap-2 z-50 shadow-2xl border-[1px] border-gray-300 transition-all duration-500 ${
          headerOpen ? 'h-56 opacity-100 pointer-events-auto' : 'h-0 opacity-0 pointer-events-none'
        }`}
      >
        {filteredLinks.map(({ href, label }) => (
          <Link
            key={href}
            onClick={() => setHeaderOpen(!headerOpen)}
            href={href}
            className="text-white/70 hover:text-white cursor-pointer"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Header;
