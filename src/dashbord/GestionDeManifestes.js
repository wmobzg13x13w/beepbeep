import React, { useState, useEffect } from "react";
import SidBar from "./SidBar";
import jsPDF from "jspdf";
import "jspdf-autotable"; // For table support in jsPDF

const GestionDeManifestes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [manifests, setManifests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("All");

  const userId = localStorage.getItem("user");

  useEffect(() => {
    const fetchManifests = async () => {
      try {
        const response = await fetch(
          `https://oil-shard-ginger.glitch.me/api/manifest/user/${userId}`
        );
        if (!response.ok) throw new Error("Failed to fetch manifests");
        const data = await response.json();
        setManifests(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchManifests();
  }, [userId]);

  const handleDelete = async (manifestId) => {
    try {
      const response = await fetch(
        `https://oil-shard-ginger.glitch.me/api/manifests/${manifestId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete manifest");

      setManifests(manifests.filter((manifest) => manifest._id !== manifestId));
      alert("Manifest deleted successfully!");
    } catch (error) {
      console.error("Error deleting manifest:", error);
      alert("Failed to delete manifest");
    }
  };

  const handlePrintInvoice = (manifest) => {
    const doc = new jsPDF();

    // Add header
    doc.setFontSize(18);
    doc.text("MANIFESTE", 10, 20);
    doc.setFontSize(12);
    doc.text(`Date Impression: ${new Date().toLocaleDateString()}`, 10, 30);

    // Add manifest info
    doc.setFontSize(12);
    doc.text(`N°: ${manifest.code}`, 10, 40);
    doc.text(
      `Nom: ${manifest.expediteur?.firstName} ${manifest.expediteur?.lastName}`,
      10,
      50
    );
    doc.text(`Tel: ${manifest.expediteur?.phoneNumber || "N/A"}`, 10, 60);
    doc.text(`Adresse: ${manifest.expediteur?.city || "N/A"}`, 10, 70);
    doc.text(`Date: ${new Date(manifest.date).toLocaleDateString()}`, 10, 80);

    // Add table
    const tableData = manifest.colis.map((colis) => [
      colis.code,
      colis.prix,
      colis.nom,
      colis.address,
      colis.designation,
      colis.nbrPieces,
      colis.status,
    ]);

    doc.autoTable({
      head: [
        ["CODE", "PRIX", "CLIENT", "ADRESSE", "Designation", "Nb P", "Status"],
      ],
      body: tableData,
      startY: 90,
    });

    // Add footer
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text(`Total: ${manifest.total} tnd`, 10, finalY);
    doc.text(`Nombre de colis: ${manifest.colis.length}`, 100, finalY);

    // Save the PDF
    doc.save(`invoice_${manifest.code}.pdf`);
  };

  const filteredManifests = manifests.filter((manifest) => {
    const expediteurFirstName = manifest.expediteur?.firstName || "";
    const expediteurLastName = manifest.expediteur?.lastName || "";
    const agence = manifest.agence || "";
    const date = manifest.date
      ? new Date(manifest.date).toLocaleDateString()
      : "";

    const matchesSearchQuery =
      expediteurFirstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expediteurLastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agence.toLowerCase().includes(searchQuery.toLowerCase()) ||
      date.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab = activeTab === "All" || manifest.status === activeTab;

    return matchesSearchQuery && matchesTab;
  });

  if (loading) {
    return <div className='text-center mt-8'>Loading...</div>;
  }

  if (error) {
    return <div className='text-center mt-8 text-red-500'>Error: {error}</div>;
  }

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <div className='fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 p-5 z-50'>
        <SidBar />
      </div>

      <div className='flex-1 ml-64 p-6'>
        <div className='px-4 md:px-10 py-4 md:py-7'>
          <div className='flex items-center justify-between'>
            <p className='text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800'>
              Manifests
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
        <div className='bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10 rounded-lg shadow-md'>
          <div className='sm:flex items-center justify-between'>
            <div className='flex items-center'>
              {["All", "Pending", "Shipped", "Delivered", "Retour"].map(
                (tab) => (
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
                )
              )}
            </div>
            <div className='mt-4 sm:mt-0 flex items-center'>
              <div className='relative mr-4'>
                <input
                  type='text'
                  placeholder='Search by Expéditeur, Agence, or Date'
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
            </div>
          </div>
          <div className='mt-7 overflow-x-auto'>
            <table className='w-full whitespace-nowrap'>
              <thead>
                <tr className='h-16 border-b border-gray-100 bg-gray-50'>
                  <th className='text-left pl-5'>EXPEDITEUR</th>
                  <th className='text-left pl-5'>AGENCE</th>
                  <th className='text-left pl-5'>DATE</th>
                  <th className='text-left pl-5'>NB Pickup</th>
                  <th className='text-left pl-5'>NB Total</th>
                  <th className='text-left pl-5'>TOTAL</th>
                  <th className='text-left pl-5'>STATUS</th>
                  <th className='text-left pl-5'>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredManifests.map((manifest) => (
                  <tr
                    key={manifest._id}
                    className='h-16 border-b border-gray-100 hover:bg-gray-50 transition-colors'>
                    <td className='pl-5'>
                      <p className='text-base font-medium leading-none text-gray-700'>
                        {manifest.expediteur?.firstName}{" "}
                        {manifest.expediteur?.lastName}
                      </p>
                    </td>
                    <td className='pl-5'>
                      <p className='text-base font-medium leading-none text-gray-700'>
                        {manifest.agence || "N/A"}
                      </p>
                    </td>
                    <td className='pl-5'>
                      <p className='text-base font-medium leading-none text-gray-700'>
                        {manifest.date
                          ? new Date(manifest.date).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </td>
                    <td className='pl-5'>
                      <p className='text-base font-medium leading-none text-gray-700'>
                        {manifest.nbPickup || "N/A"}
                      </p>
                    </td>
                    <td className='pl-5'>
                      <p className='text-base font-medium leading-none text-gray-700'>
                        {manifest.nbTotal || "N/A"}
                      </p>
                    </td>
                    <td className='pl-5'>
                      <p className='text-base font-medium leading-none text-gray-700'>
                        {manifest.total || "N/A"}
                      </p>
                    </td>
                    <td className='pl-5'>
                      <div className='flex items-center'>
                        <div
                          className={`w-2 h-2 rounded-full mr-2 ${
                            manifest.status === "Delivered"
                              ? "bg-green-500"
                              : manifest.status === "Shipped"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}></div>
                        <p className='text-sm leading-none text-gray-600'>
                          {manifest.status || "N/A"}
                        </p>
                      </div>
                    </td>
                    <td className='pl-5'>
                      <div className='flex items-center justify-center'>
                        <button
                          onClick={() => handleDelete(manifest._id)}
                          className='bg-transparent hover:bg-gray-100 text-gray-600 text-xs font-medium py-2 px-5 rounded-md focus:outline-none flex justify-center items-center'>
                          <span>Delete</span>
                        </button>
                        <button
                          onClick={() => handlePrintInvoice(manifest)}
                          className='bg-transparent hover:bg-gray-100 text-gray-600 text-xs font-medium py-2 px-5 rounded-md focus:outline-none flex justify-center items-center ml-2'>
                          <span>Print Invoice</span>
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

export default GestionDeManifestes;
