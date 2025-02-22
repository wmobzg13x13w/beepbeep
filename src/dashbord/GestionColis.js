import React, { useState, useEffect } from "react";
import SidBar from "./SidBar";

const GestionDesColis = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [parcels, setParcels] = useState([]); // State to store colis data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to handle errors

  // Fetch colis data from the backend
  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const Id = localStorage.getItem("user");
        const response = await fetch(
          `https://oil-shard-ginger.glitch.me/api/colis/user/${Id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch colis data");
        }
        const data = await response.json();
        setParcels(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParcels();
  }, []);

  // Handle delete colis
  const handleDelete = async (colisId) => {
    try {
      const response = await fetch(
        `https://oil-shard-ginger.glitch.me/api/colis/${colisId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete colis");
      }

      // Remove the deleted colis from the state
      setParcels(parcels.filter((parcel) => parcel._id !== colisId));
      alert("Colis deleted successfully!");
    } catch (error) {
      console.error("Error deleting colis:", error);
      alert("Failed to delete colis");
    }
  };

  // Handle update colis (redirect to edit page or open a modal)
  const handleEdit = (colisId) => {
    // Redirect to an edit page or open a modal with the colis data
    console.log("Edit colis with ID:", colisId);
    // Example: navigate(`/edit-colis/${colisId}`);
  };

  // Filter parcels based on search query
  const filteredParcels = parcels.filter(
    (parcel) =>
      parcel.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parcel.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parcel.designation.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg'>
          <h1 className='text-3xl font-semibold text-center mb-6 text-gray-800'>
            GESTION DES COLIS
          </h1>

          {/* Filters */}
          <div className='flex flex-wrap gap-4 mb-6'>
            <select className='p-2 border border-gray-300 rounded-lg bg-white'>
              <option>Livrés</option>
              <option>En Cours</option>
              <option>En Attente</option>
            </select>
            <input
              type='text'
              placeholder='Client (Nom/Tel)'
              className='p-2 border border-gray-300 rounded-lg flex-1'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <input
              type='text'
              placeholder='Code'
              className='p-2 border border-gray-300 rounded-lg flex-1'
            />
            <input
              type='text'
              placeholder='Article'
              className='p-2 border border-gray-300 rounded-lg flex-1'
            />
            <input
              type='date'
              className='p-2 border border-gray-300 rounded-lg'
            />
            <button className='bg-indigo-700 text-white px-5 py-2 rounded-lg shadow-md hover:bg-indigo-900 transition duration-300'>
              Rechercher
            </button>
          </div>

          {/* Table */}
          <div className='mt-7 overflow-x-auto'>
            <table className='w-full whitespace-nowrap'>
              <thead>
                <tr className='h-16 border-b border-gray-100'>
                  <th className='text-left pl-5'>CODE</th>
                  <th className='text-left pl-5'>DATE</th>
                  <th className='text-left pl-5'>AGENCE</th>
                  <th className='text-left pl-5'>DESIGNATION</th>
                  <th className='text-left pl-5'>CLIENT</th>
                  <th className='text-left pl-5'>État</th>
                  <th className='text-left pl-5'>PRIX</th>
                  <th className='text-left pl-5'>ADRESSE</th>
                  <th className='text-left pl-5'>VILLE</th>
                  <th className='text-left pl-5'>GOUVERNORAT</th>
                  <th className='text-left pl-5'>TYPE</th>
                  <th className='text-left pl-5'>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredParcels.length > 0 ? (
                  filteredParcels.map((parcel) => (
                    <tr
                      key={parcel._id}
                      className='h-16 border border-gray-100 rounded'>
                      <td className='pl-5'>
                        <p className='text-base font-medium leading-none text-gray-700'>
                          {parcel.code}
                        </p>
                      </td>
                      <td className='pl-5'>
                        <p className='text-base font-medium leading-none text-gray-700'>
                          {new Date(parcel.createdAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td className='pl-5'>
                        <p className='text-base font-medium leading-none text-gray-700'>
                          {parcel.agence}
                        </p>
                      </td>
                      <td className='pl-5'>
                        <p className='text-base font-medium leading-none text-gray-700'>
                          {parcel.designation}
                        </p>
                      </td>
                      <td className='pl-5'>
                        <p className='text-base font-medium leading-none text-gray-700'>
                          {parcel.nom}
                        </p>
                      </td>
                      <td className='pl-5'>
                        <div className='flex items-center'>
                          <div
                            className={`w-2 h-2 rounded-full mr-2 ${
                              parcel.status === "Delivered"
                                ? "bg-green-500"
                                : parcel.status === "Shipped"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}></div>
                          <p className='text-sm leading-none text-gray-600'>
                            {parcel.status}
                          </p>
                        </div>
                      </td>
                      <td className='pl-5'>
                        <p className='text-sm leading-none text-gray-600'>
                          {parcel.prix} TND
                        </p>
                      </td>
                      <td className='pl-5'>
                        <p className='text-sm leading-none text-gray-600'>
                          {parcel.address}
                        </p>
                      </td>
                      <td className='pl-5'>
                        <p className='text-sm leading-none text-gray-600'>
                          {parcel.localite}
                        </p>
                      </td>
                      <td className='pl-5'>
                        <p className='text-sm leading-none text-gray-600'>
                          {parcel.couvernant}
                        </p>
                      </td>
                      <td className='pl-5'>
                        <p className='text-sm leading-none text-gray-600'>
                          {parcel.type}
                        </p>
                      </td>
                      <td className='pl-5'>
                        <div className='flex items-center justify-center'>
                          <button
                            onClick={() => handleDelete(parcel._id)}
                            className='bg-transparent hover:bg-gray-100 text-gray-600 text-xs font-medium py-2 px-5 ml-2 rounded-md focus:outline-none flex justify-center items-center'>
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan='13' className='text-center p-4 text-gray-500'>
                      No data available in table
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className='flex justify-between items-center mt-4'>
            <p className='text-gray-600'>
              Showing {filteredParcels.length} of {parcels.length} entries
            </p>
            <div className='flex gap-2'>
              <button className='bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300'>
                Previous
              </button>
              <button className='bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300'>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionDesColis;
