"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "../_components/Footer";
import Header from "../_components/Header";

const GenerateBills = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [utilityType, setUtilityType] = useState<string>("");
  const [billAmount, setBillAmount] = useState<number | "">("");
  const [dueDate, setDueDate] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    // Fetch users from the backend
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/bills/"); // Replace with your API endpoint
        const data = await response.json();
        setUsers(data.users); // Adjust according to the API response structure
      } catch (err) {
        setError("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, []);

  const handleGenerateBills = async () => {
    if (
      !selectedMonth ||
      !utilityType ||
      billAmount === "" ||
      !dueDate ||
      !selectedUser
    ) {
      setError("Please fill out all fields.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/bills/", {
        method: "POST",
        body: JSON.stringify({
          user: selectedUser,
          bill_type: utilityType,
          amount_due: billAmount,
          due_date: dueDate,
        }),
      });

      if (response.ok) {
        setSuccess("Bills generated successfully!");
        router.push("/manage-bills"); // Redirect to manage bills page after success
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to generate bills.");
      }
    } catch (err) {
      setError(
        "An error occurred while generating the bills. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <main className="flex-1 mt-8 px-6">
        <section className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-screen-md mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-purple-300">
            Generate Utility Bills
          </h2>
          <p className="text-lg mb-6 text-gray-400">
            Select the month, utility type, amount, due date, and assign the
            bill to a user.
          </p>

          <div className="space-y-6">
            <div>
              <label
                htmlFor="month"
                className="block text-lg font-semibold mb-2 text-gray-200"
              >
                Month
              </label>
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
              <label
                htmlFor="utility"
                className="block text-lg font-semibold mb-2 text-gray-200"
              >
                Utility Type
              </label>
              <select
                id="utility"
                value={utilityType}
                onChange={(e) => setUtilityType(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                required
              >
                <option value="" disabled>
                  Select Utility Type
                </option>
                <option value="electricity">Electricity</option>
                <option value="water">Water</option>
                <option value="gas">Gas</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="amount"
                className="block text-lg font-semibold mb-2 text-gray-200"
              >
                Bill Amount (PKR)
              </label>
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
              <label
                htmlFor="dueDate"
                className="block text-lg font-semibold mb-2 text-gray-200"
              >
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                required
              />
            </div>

            <div>
              <label
                htmlFor="user"
                className="block text-lg font-semibold mb-2 text-gray-200"
              >
                User
              </label>
              <select
                id="user"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                required
              >
                <option value="" disabled>
                  Select User
                </option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleGenerateBills}
              disabled={loading}
              className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition"
            >
              {loading ? "Generating..." : "Generate Bills"}
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
