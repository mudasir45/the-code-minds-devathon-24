"use client";

import React, { useEffect, useState } from 'react';
import Header from '../_components/Header';
import Footer from '../_components/Footer';

interface UserProps {
  name: string;
  email: string;
  house_no: string;
  user_role: string;
  user_id: string;
}


const dummyUsers: UserProps[] = [
    {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      house_no: "101",
      user_role: "Admin",
      user_id: "1"
    },
    {
      name: "Bob Smith",
      email: "bob.smith@example.com",
      house_no: "102",
      user_role: "User",
      user_id: "2"
    },
    {
      name: "Carol White",
      email: "carol.white@example.com",
      house_no: "103",
      user_role: "Moderator",
      user_id: "3"
    },
    {
      name: "David Brown",
      email: "david.brown@example.com",
      house_no: "104",
      user_role: "User",
      user_id: "4"
    },
    {
      name: "Emma Davis",
      email: "emma.davis@example.com",
      house_no: "105",
      user_role: "User",
      user_id: "5"
    }
  ];
  

const UserManagement = () => {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        // const data = await response.json();
        const data = dummyUsers        
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEditPermissions = (userId: string) => {
    // Redirect to the edit permissions page
    console.log(`Edit permissions for user ID: ${userId}`);
    // Implement redirection logic here
  };

  const handleBanUser = async (userId: string) => {
    try {
      await fetch(`/api/users/${userId}/ban`, { method: 'POST' });
      // Update state to reflect changes
      setUsers(users.filter(user => user.user_id !== userId));
    } catch (error) {
      console.error('Failed to ban user', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <main className="flex-1 mt-8 px-5">
        <section className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-screen-lg mx-auto">
          <h2 className="text-3xl font-semibold mb-4">User Management</h2>
          <p className="text-lg mb-6">Manage user roles and permissions. You can edit user permissions or ban users as needed.</p>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white text-black rounded-lg shadow-md">
                <thead>
                  <tr className='grid grid-cols-8 break-all'>
                    <th className="py-3 px-4 border-b text-start">Name</th>
                    <th className="py-3 px-4 col-span-2 border-b text-start">Email</th>
                    <th className="py-3 px-4 border-b text-start">House No</th>
                    <th className="py-3 px-4 border-b text-start">Role</th>
                    <th className="py-3 px-4 border-b col-span-3 text-start">Make Him</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr className='grid grid-cols-8 break-all' key={user.user_id}>
                      <td className="py-3 px-4 border-b">{user.name}</td>
                      <td className="py-3 px-4 border-b col-span-2">{user.email}</td>
                      <td className="py-3 px-4 border-b">{user.house_no}</td>
                      <td className="py-3 px-4 border-b">{user.user_role}</td>
                      <td className="py-3 px-4 border-b flex gap-2 col-span-3">                        
                        <button
                          onClick={() => handleBanUser(user.user_id)}
                          className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600"
                        >
                          Admin
                        </button>
                        <button
                          onClick={() => handleBanUser(user.user_id)}
                          className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600"
                        >
                          Support
                        </button>
                        <button
                          onClick={() => handleBanUser(user.user_id)}
                          className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600"
                        >
                          User
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default UserManagement;
