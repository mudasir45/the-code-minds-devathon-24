'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import Image from 'next/image';
import Banner from "@/app/_assets/banner.jpg"
import HowWorks from "@/app/_assets/works.jpg"
import Footer from './_components/Footer';
import Header from './_components/Header';

const Home = () => {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Simulating fetching user role from cookies or authentication
    setUserRole('admin');
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
       <Header/>       
      <div className="bg-gray-900 text-white shadow-lg">
        <div className="relative">
          <Image
            src={Banner}
            alt="Society Management Banner"
            className="w-full h-[70vh] object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 px-3 ">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-center max-w-screen-md mx-auto">Welcome to the Society Management System</h1>
            <p className="md:text-lg text-center max-w-screen-md mx-auto">Your all-in-one solution for managing utilities and billing efficiently.</p>
          </div>
        </div>
      </div>

      <section className="text-center mt-16 px-5">
        <h2 className="text-3xl font-semibold mb-6">Get Started</h2>
        <p className="text-lg mb-8 max-w-screen-md mx-auto">
          Whether you are an admin, customer support agent, or resident, our platform offers a seamless experience
          tailored to your needs. Explore the links below based on your role to get started.
        </p>
        <div className='max-w-screen-md mx-auto'>
        {userRole === 'admin' && <AdminDashboardLinks />}
        {userRole === 'customer-support' && <CustomerSupportDashboardLinks />}
        {userRole === 'resident' && <ResidentDashboardLinks />}
        </div>
      </section>

      <div className="flex-1 mt-16 px-4">
        <section className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-6">How It Works</h2>
          <p className="text-lg mb-8 max-w-screen-md mx-auto">
            Our platform helps streamline the management of electricity, gas, and water utilities in your society.
            Administrators can easily generate and manage bills, while residents can view their billing history,
            make payments, and stay updated on their utility status.
          </p>
          <Image
            src={HowWorks}
            alt="How It Works"
            className="w-full max-w-screen-md mx-auto mb-8"
          />
        </section>

        <section className="text-center mt-16">
          <h2 className="text-3xl font-semibold mb-6">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white text-black p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Bill Management</h3>
              <p className="text-md max-w-screen-md mx-auto">
                Easily generate, manage, and track utility bills for the entire society. Stay on top of payments and due dates.
              </p>
            </div>
            <div className="bg-white text-black p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Resident Portal</h3>
              <p className="text-md max-w-screen-md mx-auto">
                Residents can access their billing information, view past payments, and make payments online with ease.
              </p>
            </div>
            <div className="bg-white text-black p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Support & Assistance</h3>
              <p className="text-md max-w-screen-md mx-auto">
                Customer support is available to assist with any issues or inquiries related to billing and utility management.
              </p>
            </div>
          </div>
        </section>


      </div>
      <Footer/>
    </div>
  );
};

const AdminDashboardLinks = () => (
  <div className="space-y-4">
    <Link href="/generate-bills" className="block bg-white text-black py-3 px-6 rounded-lg hover:bg-gray-200 shadow-md">
      Generate Bills
    </Link>
    <Link href="/manage-bills" className="block bg-white text-black py-3 px-6 rounded-lg hover:bg-gray-200 shadow-md">
      Manage Bills
    </Link>
    <Link href="/manage-users" className="block bg-white text-black py-3 px-6 rounded-lg hover:bg-gray-200 shadow-md">
      Manage Users
    </Link>
  </div>
);

const CustomerSupportDashboardLinks = () => (
  <div className="space-y-4">
    <Link
      href="/assist-residents"
      className="block bg-white text-black py-3 px-6 rounded-lg hover:bg-gray-200 shadow-md"
    >
      Assist Residents
    </Link>
    <Link
      href="/view-bill-issues"
      className="block bg-white text-black py-3 px-6 rounded-lg hover:bg-gray-200 shadow-md"
    >
      View Bill Issues
    </Link>
  </div>
);

const ResidentDashboardLinks = () => (
  <div className="space-y-4">
    <Link
      href="/current-bills"
      className="block bg-white text-black py-3 px-6 rounded-lg hover:bg-gray-200 shadow-md"
    >
      View Current Bills
    </Link>
    <Link
      href="/payment-history"
      className="block bg-white text-black py-3 px-6 rounded-lg hover:bg-gray-200 shadow-md"
    >
      Payment History
    </Link>
    <Link
      href="/make-payment"
      className="block bg-white text-black py-3 px-6 rounded-lg hover:bg-gray-200 shadow-md"
    >
      Make Payment
    </Link>
  </div>
);

export default Home;
