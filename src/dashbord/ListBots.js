import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SidBar from "./SidBar";

export default function ListBots() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Fetching the list of users from the API
  const getUsers = async () => {
    try {
      const response = await axios.get(
        "https://oil-shard-ginger.glitch.me/api/users/users",
        {
          params: { role: "user" }, // Fetch only users with role "user"
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Function to generate initials from first name and last name
  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${
      lastName?.charAt(0) || ""
    }`.toUpperCase();
  };

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='flex h-screen bg-gray-50'>
      <div className='fixed inset-0 w-64 bg-white border-r border-gray-200 p-5'>
        <SidBar />
      </div>
      <div className='flex-1 ml-64 p-6 overflow-auto'>
        <div className='mx-auto container py-20 px-6'>
          <h1 className='text-2xl font-bold mb-6'>List of Users</h1>

          <input
            type='text'
            placeholder='Search users...'
            className='mb-4 p-2 w-full border border-gray-300 rounded'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className='bg-white rounded-lg shadow overflow-hidden'>
            <table className='min-w-full'>
              <thead className='bg-gray-100'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Initials
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    First Name
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Last Name
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Email
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Phone Number
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td className='px-6 py-4'>
                      <div className='flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full'>
                        {getInitials(user.firstName, user.lastName)}
                      </div>
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-900'>
                      {user.firstName}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-900'>
                      {user.lastName}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-900'>
                      {user.email}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-900'>
                      {user.phoneNumber}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-900'>
                      <button
                        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                        onClick={() => setSelectedUser(user)}>
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedUser && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-6 rounded-lg w-1/2 shadow-lg overflow-y-auto max-h-[80vh]'>
            <h2 className='text-xl font-bold mb-4'>
              {selectedUser.firstName} {selectedUser.lastName}
            </h2>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Phone Number:</strong> {selectedUser.phoneNumber}
            </p>
            <p>
              <strong>Role:</strong> {selectedUser.role}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(selectedUser.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Updated At:</strong>{" "}
              {new Date(selectedUser.updatedAt).toLocaleString()}
            </p>
            <button
              className='mt-4 px-4 py-2 border border-gray-400 text-black rounded hover:bg-gray-200'
              onClick={() => setSelectedUser(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
