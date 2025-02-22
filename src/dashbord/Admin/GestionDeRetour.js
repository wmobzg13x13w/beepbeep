import React, { useState, useEffect } from "react";
import SidBar from "./SidBar";

const GestionDeRetour = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [colis, setColis] = useState([]); // State to store colis data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to handle errors

  // Fetch colis data from the backend
  useEffect(() => {
    const fetchColis = async () => {
      try {
        const userId = localStorage.getItem("user");
        const response = await fetch(`http://localhost:3000/api/colis/user/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch colis data");
        }
        const data = await response.json();
        setColis(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchColis();
  }, []);

  // Filter colis to include only those with status "Retour"
  const filteredColis = colis
    .filter((colis) => colis.status === "Retour") // Filter by status "Retour"
    .filter((colis) =>
      colis.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      colis.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      colis.designation.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  }

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
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Gestion des Retours</p>
            <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
              <p>Sort By:</p>
              <select className="focus:outline-none bg-transparent ml-1">
                <option className="text-sm text-indigo-800">Latest</option>
                <option className="text-sm text-indigo-800">Oldest</option>
              </select>
            </div>
          </div>
        </div>
        <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
          <div className="sm:flex items-center justify-between">
        
            <div className="mt-4 sm:mt-0 flex items-center">
              {/* Search Bar */}
              <div className="relative mr-4">
                <input
                  type="text"
                  placeholder="Search by Code, Client, or Designation"
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
                <p className="text-sm font-medium leading-none text-white">Add Return</p>
              </button>
            </div>
          </div>
          <div className="mt-7 overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="h-16 border-b border-gray-100">
                  <th className="text-left pl-5">CODE</th>
                  <th className="text-left pl-5">DATE</th>
                  <th className="text-left pl-5">AGENCE</th>
                  <th className="text-left pl-5">DESIGNATION</th>
                  <th className="text-left pl-5">CLIENT</th>
                  <th className="text-left pl-5">État</th>
                  <th className="text-left pl-5">PRIX</th>
                  <th className="text-left pl-5">ADRESSE</th>
                  <th className="text-left pl-5">VILLE</th>
                  <th className="text-left pl-5">GOUVERNORAT</th>
                  <th className="text-left pl-5">TYPE</th>
                </tr>
              </thead>
              <tbody>
                {filteredColis.length > 0 ? (
                  filteredColis.map((colis) => (
                    <tr key={colis._id} className="h-16 border border-gray-100 rounded">
                      <td className="pl-5">
                        <p className="text-base font-medium leading-none text-gray-700">{colis.code}</p>
                      </td>
                      <td className="pl-5">
                        <p className="text-base font-medium leading-none text-gray-700">
                          {new Date(colis.createdAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="pl-5">
                        <p className="text-base font-medium leading-none text-gray-700">{colis.agence}</p>
                      </td>
                      <td className="pl-5">
                        <p className="text-base font-medium leading-none text-gray-700">{colis.designation}</p>
                      </td>
                      <td className="pl-5">
                        <p className="text-base font-medium leading-none text-gray-700">{colis.nom}</p>
                      </td>
                      <td className="pl-5">
                        <div className="flex items-center">
                          <div
                            className={`w-2 h-2 rounded-full mr-2 ${
                              colis.status === "Retour" ? "bg-red-500" : "bg-gray-500"
                            }`}
                          ></div>
                          <p className="text-sm leading-none text-gray-600">{colis.status}</p>
                        </div>
                      </td>
                      <td className="pl-5">
                        <p className="text-sm leading-none text-gray-600">{colis.prix} TND</p>
                      </td>
                      <td className="pl-5">
                        <p className="text-sm leading-none text-gray-600">{colis.address}</p>
                      </td>
                      <td className="pl-5">
                        <p className="text-sm leading-none text-gray-600">{colis.localite}</p>
                      </td>
                      <td className="pl-5">
                        <p className="text-sm leading-none text-gray-600">{colis.couvernant}</p>
                      </td>
                      <td className="pl-5">
                        <p className="text-sm leading-none text-gray-600">{colis.type}</p>
                      </td>
                
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12" className="text-center p-4 text-gray-500">
                      No colis with status "Retour" found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionDeRetour;