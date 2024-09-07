'use client';

import { useEffect, useState } from 'react';
import Footer from '../_components/Footer';
import Header from '../_components/Header';
import Link from 'next/link';
import Banner from "@/app/_assets/banner.jpg"


interface BillProps {
  id: string;
  month: string;
  utilityType: string;
  amount : number;
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
        const response = await fetch('/api/bills');
        // const data = await response.json();
        setBills(dummyBills);
      } catch (error) {
        setError('Failed to fetch bills');
        console.error('Failed to fetch bills', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  const handleDeleteBill = async (billId: string) => {
    // Call API to delete bill
    try {
      await fetch(`/api/bills/${billId}`, { method: 'DELETE' });
      // Update state to reflect changes
      setBills(bills.filter(bill => bill.id !== billId));
    } catch (error) {
      console.error('Failed to delete bill', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <main className="flex-1 mt-8 px-5">
        <section className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-screen-lg mx-auto">
          <h2 className="text-3xl font-semibold mb-4">Bill Management</h2>
          <p className="text-lg mb-6">Manage and review utility bills generated for your society.</p>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white text-black rounded-lg shadow-md">
                <thead>
                  <tr className='grid grid-cols-5 text-start'>
                    <th className="py-3 px-4 border-b text-start">Month</th>
                    <th className="py-3 px-4 border-b text-start">Utility Type</th>
                    <th className="py-3 px-4 border-b text-start">Amount</th>
                    <th className="py-3 px-4 border-b text-start">Status</th>
                    <th className="py-3 px-4 border-b text-start">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bills.map(bill => (
                    <tr key={bill.id} className='grid grid-cols-5 hover:bg-purple-200'>
                      
                      <td className="py-3 px-4 border-b">{bill.month}</td>
                      <td className="py-3 px-4 border-b">{bill.utilityType}</td>
                      <td className="py-3 px-4 border-b">{bill.amount}</td>
                      
                      <td className="py-3 px-4 border-b">{bill.status}</td>
                      <td className="py-3 px-4 border-b flex gap-2">
                       <Link  href={`/bills/${bill.id}`} className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600">Details</Link>
                        <button
                          onClick={() => handleDeleteBill(bill.id)}
                          className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600"
                        >
                          Delete
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

export default BillManagement;
