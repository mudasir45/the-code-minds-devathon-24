// pages/bill-management.tsx
"use client"
import { useEffect, useState } from 'react';
import Footer from '../_components/Footer';
import Header from '../_components/Header';
import Link from 'next/link';
import Banner from "@/app/_assets/banner.jpg";

interface BillProps {
  id: string;
  month: string;
  utilityType: string;
  amount: number;
  imageUrl: string;
  status: string;
}

const dummyBills: BillProps[] = [
  {
    id: '1',
    month: '2024-08',
    utilityType: 'electricity',
    imageUrl: Banner.src,
    amount: 100,
    status: 'paid',
  },
  {
    id: '2',
    month: '2024-08',
    utilityType: 'water',
    imageUrl: '/images/bill2.jpg',
    status: 'pending',
    amount: 100,
  },
  {
    id: '3',
    month: '2024-07',
    utilityType: 'gas',
    imageUrl: '/images/bill3.jpg',
    status: 'paid',
    amount: 100,
  },
  {
    id: '4',
    month: '2024-06',
    utilityType: 'electricity',
    imageUrl: '/images/bill4.jpg',
    status: 'overdue',
    amount: 100,
  },
];

const BillManagement = () => {
  const [bills, setBills] = useState<BillProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch bills from API
    const fetchBills = async () => {
      try {
        const cusome_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI2MzAxMzE2LCJpYXQiOjE3MjU2OTY1MTYsImp0aSI6IjRmZmYwMjY5NDg2YTRkNGRiNTMzNTg1YWM3ZGNlOGU1IiwidXNlcl9pZCI6MTB9.nbQ95V5iTFgS_kY_ohwbmA6Xvr4iVnzbOTNJd94B0ac'
        const response = await fetch('https://1ca1-58-27-193-246.ngrok-free.app/api/main/bills/', {
            method: 'GET',
        //   headers: {
        //     // 'Content-Type': 'application/json',
        //     // 'Authorization': `Bearer ${cusome_token}`, 
        //   },
        });
    
        const text = await response.json(); // Read response as text
        console.log('Response text:', text); // Log the raw text
    
        if (response.ok) {
        //   const data = JSON.parse(text); // Attempt to parse JSON from text
          console.log("Data:", text);
        //   setBills(data); // Set state with the fetched data
        } else {
          throw new Error(`HTTP error! Status: ${response.status}. Response: ${text}`);
        }
      } catch (error) {
        console.error('Failed to fetch bills', error);
        setError('Failed to fetch bills');
      } finally {
        setLoading(false);
      }
    };
    
    

    fetchBills();
  }, []); // Depend on cookies.access_token

  const handleDeleteBill = async (billId: string) => {
    // Call API to delete bill
    try {
      const response = await fetch(`/api/bills/${billId}`, {
        method: 'DELETE',
        headers: {
        //   'Authorization': `Bearer ${cookies.access_token}`, // Include access token in headers
        },
      });

      if (response.ok) {
        // Update state to reflect changes
        setBills(bills.filter(bill => bill.id !== billId));
      } else {
        console.error('Failed to delete bill');
      }
    } catch (error) {
      console.error('Failed to delete bill', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
     
    </div>
  );
};

export default BillManagement;
