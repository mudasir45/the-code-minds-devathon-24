'use client';

import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    houseNumber: '',
    password: '',
    otp: '' // Added field for OTP
  });

  const [step, setStep] = useState(1); // Step 1: Registration, Step 2: OTP Verification
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [token, setToken] = useState<string | undefined>();
  const [otpExpiryTime, setOtpExpiryTime] = useState<number | null>(null); // Time when OTP expires
  const router = useRouter();

  useEffect(() => {
    if (otpExpiryTime !== null) {
      const interval = setInterval(() => {
        if (Date.now() > otpExpiryTime) {
          setError('OTP has expired. Please request a new one.');
          setStep(1);
          setOtpExpiryTime(null);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [otpExpiryTime]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (step === 1) {
      // Step 1: Registration
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters long.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('https://5f69-58-27-193-246.ngrok-free.app/api/auth/signup/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            first_name: formData.fullName,
            email: formData.email,
            house_number: formData.houseNumber,
            password: formData.password,
          }),
        });

        if (response.ok) {
          // If registration is successful, move to OTP verification step
          const data = await response.json() as {token: string};
          console.log(data);
          setToken(data.token);
          setOtpExpiryTime(Date.now() + 60000); // Set OTP expiry time to 60 seconds from now
          setStep(2);
          setSuccess('Registration successful. Please check your email for the OTP.');
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Registration failed.');
        }
      } catch (error) {
        setError('Network error, please try again.');
      } finally {
        setLoading(false);
      }
    } else if (step === 2) {
      // Step 2: OTP Verification
      if (!/^\d{4}$/.test(formData.otp)) {
        setError('OTP must be exactly 4 digits.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('https://5f69-58-27-193-246.ngrok-free.app/api/auth/verify-otp/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: token,
            otp: formData.otp,
          }),
        });

        if (response.ok) {
          router.push('/');
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'OTP verification failed.');
        }
      } catch (error) {
        setError('Network error, please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          {step === 1 ? 'Register' : 'Verify OTP'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <>
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
            </>
          )}
          {step === 2 && (
            <div>
              <label className="block text-black text-sm font-bold mb-2" htmlFor="otp">
                Enter OTP
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                value={formData.otp}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-black"
                required
              />
            </div>
          )}

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          {success && (
            <p className="text-green-500 text-sm">{success}</p>
          )}

          <button
            type="submit"
            className={`w-full py-2 px-4 font-bold rounded-md text-white ${
              loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
            }`}
            disabled={loading}
          >
            {loading ? (step === 1 ? 'Registering...' : 'Verifying OTP...') : (step === 1 ? 'Register' : 'Verify OTP')}
          </button>
        </form>
        <div className="mt-4 text-center">
          {step === 1 ? (
            <p className="text-sm text-black">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-500 hover:underline">
                Login here
              </Link>
            </p>
          ) : (
            <p className="text-sm text-black">
              Back to{' '}
              <button
                type="button"
                onClick={() =>{ setStep(1); setSuccess(''); setError('')}}
                className="text-blue-500 hover:underline"
              >
                Registration
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
