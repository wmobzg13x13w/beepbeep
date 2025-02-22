import React, { useState } from "react";
import SidBar from "./SidBar";

const ExampleTable = () => {
    const [show, setShow] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
  
    // Sample data for parcels
    const [parcels, setParcels] = useState([
      { id: 1, trackingId: "#123456789", sender: "John Doe", recipient: "Jane Smith", status: "Delivered", deliveryDate: "2023-10-15" },
      { id: 2, trackingId: "#987654321", sender: "Alice Johnson", recipient: "Bob Brown", status: "In Transit", deliveryDate: "2023-10-20" },
      { id: 3, trackingId: "#456789123", sender: "Charlie Davis", recipient: "Eva Green", status: "Pending", deliveryDate: "2023-10-25" },
    ]);
  
    // Filter parcels based on search query
    const filteredParcels = parcels.filter((parcel) =>
      parcel.trackingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parcel.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parcel.recipient.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    return (
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 p-5 z-50">
          <SidBar />
        </div>
  
        {/* Main Content */}
        <div className="flex-1 ml-64 p-6">
          <div className="px-4 md:px-10 py-4 md:py-7">
            <div className="flex items-center justify-between">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Parcels</p>
              <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                <p>Sort By:</p>
                <select className="focus:outline-none bg-transparent ml-1">
                  <option className="text-sm text-indigo-800">Latest</option>
                  <option className="text-sm text-indigo-800">Oldest</option>
                  <option className="text-sm text-indigo-800">Status</option>
                </select>
              </div>
            </div>
          </div>
          <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
            <div className="sm:flex items-center justify-between">
              <div className="flex items-center">
                <a href="javascript:void(0)">
                  <div className="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
                    <p>All</p>
                  </div>
                </a>
                <a href="javascript:void(0)">
                  <div className="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ml-4 sm:ml-8">
                    <p>Delivered</p>
                  </div>
                </a>
                <a href="javascript:void(0)">
                  <div className="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ml-4 sm:ml-8">
                    <p>In Transit</p>
                  </div>
                </a>
                <a href="javascript:void(0)">
                  <div className="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ml-4 sm:ml-8">
                    <p>Pending</p>
                  </div>
                </a>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center">
                {/* Search Bar */}
                <div className="relative mr-4">
                  <input
                    type="text"
                    placeholder="Search by Tracking ID, Sender, or Recipient"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <svg
                    className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <button className="inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                  <p className="text-sm font-medium leading-none text-white">Add Parcel</p>
                </button>
              </div>
            </div>
            <div className="mt-7 overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <thead>
                  <tr className="h-16 border-b border-gray-100">
                    <th className="text-left pl-5">Tracking ID</th>
                    <th className="text-left pl-5">Sender</th>
                    <th className="text-left pl-5">Recipient</th>
                    <th className="text-left pl-5">Status</th>
                    <th className="text-left pl-5">Delivery Date</th>
                    <th className="text-left pl-5">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredParcels.map((parcel) => (
                    <tr key={parcel.id} className="h-16 border border-gray-100 rounded">
                      <td className="pl-5">
                        <p className="text-base font-medium leading-none text-gray-700">{parcel.trackingId}</p>
                      </td>
                      <td className="pl-5">
                        <p className="text-base font-medium leading-none text-gray-700">{parcel.sender}</p>
                      </td>
                      <td className="pl-5">
                        <p className="text-base font-medium leading-none text-gray-700">{parcel.recipient}</p>
                      </td>
                      <td className="pl-5">
                        <div className="flex items-center">
                          <div
                            className={`w-2 h-2 rounded-full mr-2 ${
                              parcel.status === "Delivered"
                                ? "bg-green-500"
                                : parcel.status === "In Transit"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                          ></div>
                          <p className="text-sm leading-none text-gray-600">{parcel.status}</p>
                        </div>
                      </td>
                      <td className="pl-5">
                        <p className="text-sm leading-none text-gray-600">{parcel.deliveryDate}</p>
                      </td>
                      <td className="pl-5">
                        <div className="flex items-center justify-center">
                          <button className="bg-transparent hover:bg-gray-100 text-gray-600 text-xs font-medium py-2 px-5 rounded-md focus:outline-none flex justify-center items-center">
                            <span>Edit</span>
                          </button>
                          <button className="bg-transparent hover:bg-gray-100 text-gray-600 text-xs font-medium py-2 px-5 ml-2 rounded-md focus:outline-none flex justify-center items-center">
                            <span>Delete</span>
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
  
export default ExampleTable;