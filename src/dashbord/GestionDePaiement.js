import React, { useState, useEffect } from "react";
import SidBar from "./SidBar";
import { useNavigate } from "react-router-dom"; // For navigation

const GestionDePaiement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("All"); // State for active tab

  const userId = localStorage.getItem("user");
  const navigate = useNavigate(); // For navigation

  // Fetch paiement data for the user (expediteur)
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch(
          `https://oil-shard-ginger.glitch.me//api/paiment/user/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch payments");
        }
        const data = await response.json();
        setPayments(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [userId]);

  // Filter payments based on search query and active tab
  const filteredPayments = payments.filter((payment) => {
    const matchesSearchQuery =
      payment.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.expediteur?.firstName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      payment.expediteur?.lastName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesTab = activeTab === "All" || payment.etat === activeTab;

    return matchesSearchQuery && matchesTab;
  });

  // Handle navigation to details page
  const handleDetailsClick = (paymentId) => {
    navigate(`/paiement/${paymentId}`); // Navigate to details page
  };

  if (loading) {
    return <div className='text-center mt-8'>Loading...</div>;
  }

  if (error) {
    return <div className='text-center mt-8 text-red-500'>Error: {error}</div>;
  }

  return (
    <div className='flex min-h-screen bg-gray-50'>
      {/* Sidebar */}
      <div className='fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 p-5 z-50'>
        <SidBar />
      </div>

      {/* Main Content */}
      <div className='flex-1 ml-64 p-6'>
        <div className='px-4 md:px-10 py-4 md:py-7'>
          <div className='flex items-center justify-between'>
            <p className='text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800'>
              Payments
            </p>
            <div className='py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded'>
              <p>Sort By:</p>
              <select className='focus:outline-none bg-transparent ml-1'>
                <option className='text-sm text-indigo-800'>Latest</option>
                <option className='text-sm text-indigo-800'>Oldest</option>
                <option className='text-sm text-indigo-800'>Status</option>
              </select>
            </div>
          </div>
        </div>
        <div className='bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10'>
          <div className='sm:flex items-center justify-between'>
            <div className='flex items-center'>
              {/* Status Tabs */}
              {["All", "pending", "completed", "failed"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-8 ${
                    activeTab === tab
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-600 hover:text-indigo-700 hover:bg-indigo-100"
                  } rounded-full ml-4 sm:ml-8`}>
                  {tab}
                </button>
              ))}
            </div>
            <div className='mt-4 sm:mt-0 flex items-center'>
              {/* Search Bar */}
              <div className='relative mr-4'>
                <input
                  type='text'
                  placeholder='Search by Payment ID, Customer, or Date'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                />
                <svg
                  className='absolute left-3 top-2.5 h-5 w-5 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </div>
              <button className='inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded'>
                <p className='text-sm font-medium leading-none text-white'>
                  Add Payment
                </p>
              </button>
            </div>
          </div>
          <div className='mt-7 overflow-x-auto'>
            <table className='w-full whitespace-nowrap'>
              <thead>
                <tr className='h-16 border-b border-gray-100'>
                  <th className='text-left pl-5'>Payment ID</th>
                  <th className='text-left pl-5'>Customer</th>
                  <th className='text-left pl-5'>Amount</th>
                  <th className='text-left pl-5'>Status</th>
                  <th className='text-left pl-5'>Payment Date</th>
                  <th className='text-left pl-5'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr
                    key={payment._id}
                    className='h-16 border border-gray-100 rounded'>
                    <td className='pl-5'>
                      <p className='text-base font-medium leading-none text-gray-700'>
                        {payment.code}
                      </p>
                    </td>
                    <td className='pl-5'>
                      <p className='text-base font-medium leading-none text-gray-700'>
                        {payment.expediteur?.firstName}{" "}
                        {payment.expediteur?.lastName}
                      </p>
                    </td>
                    <td className='pl-5'>
                      <p className='text-base font-medium leading-none text-gray-700'>
                        {payment.montantRef}
                      </p>
                    </td>
                    <td className='pl-5'>
                      <div className='flex items-center'>
                        <div
                          className={`w-2 h-2 rounded-full mr-2 ${
                            payment.etat === "completed"
                              ? "bg-green-500"
                              : payment.etat === "pending"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}></div>
                        <p className='text-sm leading-none text-gray-600'>
                          {payment.etat}
                        </p>
                      </div>
                    </td>
                    <td className='pl-5'>
                      <p className='text-sm leading-none text-gray-600'>
                        {new Date(payment.date).toLocaleDateString()}
                      </p>
                    </td>
                    <td className='pl-5'>
                      <div className='flex items-center justify-center'>
                        <button
                          onClick={() => handleDetailsClick(payment._id)}
                          className='bg-transparent hover:bg-gray-100 text-gray-600 text-xs font-medium py-2 px-5 rounded-md focus:outline-none flex justify-center items-center'>
                          <span>Details</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionDePaiement;
