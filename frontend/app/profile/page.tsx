"use client"
// pages/profile.tsx

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie'; // Import useCookies from react-cookie
import Footer from '../_components/Footer';
import Header from '../_components/Header';

interface UserProps {
  name: string;
  email: string;
  house_no: string;
  user_role: string;
  user_id: string;
}

const dummyData = {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "house_no": "123A",
    "user_role": "admin",
    "user_id": "abc123"
  }
  


const UserProfile = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [cookies] = useCookies(['jwt_token']); // Fetch userRole from cookies


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get the JWT token from cookies
        const token = cookies.jwt_token;
        
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch('https://your-api-endpoint.com/api/user/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json() as UserProps;
          setUser(data);
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Failed to fetch user data.');
        }
      } catch (error) {
        setError('Network error, please try again.');
      } finally {
        setLoading(false);
      }
    };
    // setLoading(false)
    setUser(dummyData);

    // fetchUserData();
  }, []);


  if (error) {
    return <p className="text-red-500">{error}</p>;
  }


  return (
    <div className=" flex flex-col  justify-between min-h-screen items-center bg-black">
      <Header/>
      
      {error && <div className='text-white text-3xl '>Network Error</div>}
      {loading && <div className='text-white text-3xl '>Loading...</div>}
      {!user && <div className='text-white text-3xl '>User Not Exist</div>}
      {!loading && user && <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mt-16">
        <h2 className="text-2xl font-bold text-center text-black mb-6">User Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-black text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <p id="name" className="text-black text-sm">{user.name}</p>
          </div>
          <div>
            <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <p id="email" className="text-black text-sm">{user.email}</p>
          </div>
          <div>
            <label className="block text-black text-sm font-bold mb-2" htmlFor="house_no">
              House Number
            </label>
            <p id="house_no" className="text-black text-sm">{user.house_no}</p>
          </div>
          <div>
            <label className="block text-black text-sm font-bold mb-2" htmlFor="user_role">
              Role
            </label>
            <p id="user_role" className="text-black text-sm">{user.user_role}</p>
          </div>
          <div>
            <label className="block text-black text-sm font-bold mb-2" htmlFor="user_id">
              User ID
            </label>
            <p id="user_id" className="text-black text-sm">{user.user_id}</p>
          </div>
        </div>
       
      </div>}
      <Footer/>
    </div>
  );
};

export default UserProfile;
