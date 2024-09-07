'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Footer from '../../_components/Footer';
import Header from '../../_components/Header';
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
    imageUrl: Banner.src,
    amount: 100,
    status: 'pending',
  },
  {
    id: '3',
    month: '2024-07',
    utilityType: 'gas',
    imageUrl: Banner.src,
    amount: 100,
    status: 'paid',
  },
  {
    id: '4',
    month: '2024-06',
    utilityType: 'electricity',
    imageUrl: Banner.src,
    amount: 100,
    status: 'overdue',
  },
];

const BillDetail = () => {
  const { billId } = useParams();
  const [bill, setBill] = useState<BillProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBill = async () => {
      try {
        // Simulate API call
        const fetchedBill = dummyBills.find(bill => bill.id === billId);
        if (!fetchedBill) throw new Error('Bill not found');
        setBill(fetchedBill);
      } catch (error) {
        setError('Failed to fetch bill details');
        console.error('Failed to fetch bill details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBill();
  }, [billId]);

  const handleDeleteBill = async (billId: string) => {
    // Call API to delete bill
    try {
      await fetch(`/api/bills/${billId}`, { method: 'DELETE' });
      // Update state to reflect changes
    } catch (error) {
      console.error('Failed to delete bill', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />

      <main className="flex-1 mt-8 px-6">
        <section className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-screen-lg mx-auto">
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : bill ? (
            <div>
              <h2 className="text-4xl font-bold mb-6 text-purple-300">Bill Details</h2>
              <p className="text-xl mb-8 text-gray-400">Review the details of the selected bill.</p>

              <div className="space-y-6">
                <div className="bg-gray-700 p-4 rounded-lg shadow-sm">
                  <label className="block text-lg font-semibold mb-2 text-gray-200">Month</label>
                  <p className="text-xl">{bill.month}</p>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg shadow-sm">
                  <label className="block text-lg font-semibold mb-2 text-gray-200">Utility Type</label>
                  <p className="text-xl">{bill.utilityType}</p>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg shadow-sm">
                  <label className="block text-lg font-semibold mb-2 text-gray-200">Amount</label>
                  <p className="text-xl">${bill.amount.toFixed(2)}</p>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg shadow-sm">
                  <label className="block text-lg font-semibold mb-2 text-gray-200">Status</label>
                  <p className="text-xl capitalize">{bill.status}</p>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg shadow-sm">
                  <label className="block text-lg font-semibold mb-2 text-gray-200">Bill Image</label>
                  <div className="w-full max-w-md mx-auto mt-4">
                    <Image
                      src={bill.imageUrl}
                      alt="Bill Image"
                      className="w-full h-auto rounded-lg border border-gray-600"
                      width={400}
                      height={300}
                    />
                  </div>
                </div>
                <div onClick={()=>{handleDeleteBill(bill.id)}} className='bg-red-500 hover:bg-red-600 text-white text-center w-full p-2 rounded-md cursor-pointer'>Delete</div>
              </div>
            </div>
          ) : (
            <p className="text-gray-400">No bill found</p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BillDetail;
