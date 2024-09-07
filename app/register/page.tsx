"use client"
// pages/register.js

import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    houseNumber: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API request for registration
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // If the registration is successful, redirect to the home page
        router.push('/');
      } else {
        // If an error occurs, display an error message
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed.');
      }
    } catch (error) {
      setError('Network error, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-black mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-black text-sm font-bold mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black"
              required
            />
          </div>
          <div>
            <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black"
              required
            />
          </div>
          <div>
            <label className="block text-black text-sm font-bold mb-2" htmlFor="houseNumber">
              House Number
            </label>
            <input
              id="houseNumber"
              name="houseNumber"
              type="text"
              value={formData.houseNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black"
              required
            />
          </div>
          <div>
            <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className={`w-full py-2 px-4 font-bold rounded-md text-white ${
              loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
            }`}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Register'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-black">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}


// I am creating a Next.js Tailwind website with a black and white theme for my Society Management System project. The problem statement is that the society lacks a direct connection with WAPDA/LESCO for electricity, which is distributed among society members. Similarly, the system manages gas and water billing. The challenge is to create a web-based solution to automate and streamline these processes.
// For authentication, we have three roles: admin, customer support, and residents. On the frontend (we are only building the frontend), the user interface provides a centralized platform for administrators to generate and manage bills, as well as view the payment status of bills. Residents can view their current and past bills, download them as PDFs, and make payments. Bill due dates should be handled accordingly.