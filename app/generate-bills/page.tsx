'use client';

import { useState } from 'react';
import Footer from '../_components/Footer';
import Header from '../_components/Header';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const GenerateBills = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [utilityType, setUtilityType] = useState<string>('');
  const [billAmount, setBillAmount] = useState<number | ''>('');
  const [billImage, setBillImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();

  const handleBillImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setBillImage(event.target.files[0]);
    }
  };

  const handleGenerateBills = async () => {
    if (!selectedMonth || !utilityType || billAmount === '' || !billImage) {
      setError('Please fill out all fields and upload a bill image.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append('month', selectedMonth);
      formData.append('utilityType', utilityType);
      formData.append('amount', billAmount.toString());
      formData.append('billImage', billImage);

      // Simulate API call to generate bills
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay

      setSuccess('Bills generated successfully!');
      router.push('/manage-bills'); // Redirect to manage bills page after success
    } catch (err) {
      setError('An error occurred while generating the bills. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <main className="flex-1 mt-8 px-6">
        <section className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-screen-md mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-purple-300">Generate Utility Bills</h2>
          <p className="text-lg mb-6 text-gray-400">Select the month, utility type, and upload a bill image to generate bills for your society.</p>

          <div className="space-y-6">
            <div>
              <label htmlFor="month" className="block text-lg font-semibold mb-2 text-gray-200">Month</label>
              <input
                type="month"
                id="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                required
              />
            </div>

            <div>
              <label htmlFor="utility" className="block text-lg font-semibold mb-2 text-gray-200">Utility Type</label>
              <select
                id="utility"
                value={utilityType}
                onChange={(e) => setUtilityType(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                required
              >
                <option value="" disabled>Select Utility Type</option>
                <option value="electricity">Electricity</option>
                <option value="water">Water</option>
                <option value="gas">Gas</option>
              </select>
            </div>

            <div>
              <label htmlFor="amount" className="block text-lg font-semibold mb-2 text-gray-200">Bill Amount (PKR)</label>
              <input
                type="number"
                id="amount"
                value={billAmount}
                onChange={(e) => setBillAmount(Number(e.target.value))}
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                required
              />
            </div>

            <div>
              <label htmlFor="billImage" className="block text-lg font-semibold mb-2 text-gray-200">Upload Bill Image</label>
              <input
                type="file"
                id="billImage"
                accept="image/*"
                onChange={handleBillImageChange}
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                required
              />
              {billImage && (
                <div className="mt-4">
                  <p className="text-lg font-medium">Preview:</p>
                  <Image
                    src={URL.createObjectURL(billImage)}
                    alt="Bill Preview"
                    className="w-full max-w-xs mt-2 rounded-lg border border-gray-600"
                    width={400}
                    height={300}
                  />
                </div>
              )}
            </div>

            <button
              onClick={handleGenerateBills}
              disabled={loading}
              className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition"
            >
              {loading ? 'Generating...' : 'Generate Bills'}
            </button>

            {error && <p className="text-red-500 mt-4">{error}</p>}
            {success && <p className="text-green-500 mt-4">{success}</p>}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GenerateBills;
