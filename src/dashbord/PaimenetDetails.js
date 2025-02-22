import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SidBar from "./SidBar";

const PaimenetDetails = () => {
  const { id } = useParams(); // Get payment ID from URL
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch payment details
  useEffect(() => {
    console.log(id);
    const fetchPaymentDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/paiment/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch payment details");
        }
        const data = await response.json();
        setPayment(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  }

  if (!payment) {
    return <div className="text-center mt-8">Payment not found</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 p-5 z-50">
        <SidBar />
      </div>
      <div className="flex-1 ml-64 p-6">
        {/* Payment Details */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-gray-700">Détails Paiement</h2>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="flex items-center border p-2 rounded-lg">
              <span className="mr-2">👤</span>
              <p>
                {payment.expediteur?.firstName} {payment.expediteur?.lastName}
              </p>
            </div>
            <div className="flex items-center border p-2 rounded-lg">
              <span className="mr-2">💰</span>
              <p>{payment.nbColis}</p>
            </div>
            <div className="flex items-center border p-2 rounded-lg">
              <span className="mr-2">💵</span>
              <p>{payment.montantRef}</p>
            </div>
          </div>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Exporter
          </button>
        </div>

        {/* Cheque List */}
        <div className="bg-white p-4 rounded-lg shadow-lg mt-6">
          <h2 className="text-xl font-bold text-gray-700">Liste des Chèques:</h2>
          <p className="mt-2 text-gray-600">Aucun chèque trouvé</p>
        </div>

        {/* Invoice Table */}
        <div className="bg-white p-4 rounded-lg shadow-lg mt-6">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border p-2">DATE</th>
                <th className="border p-2">NB PCS</th>
                <th className="border p-2">TOTAL</th>
                <th className="border p-2">TOTAL EXP</th>
                <th className="border p-2">NB PCS LIVRES</th>
                <th className="border p-2">MT BEEPBEEP LIV</th>
                <th className="border p-2">NB RETOUR</th>
                <th className="border p-2">MT BEEPBEEP RET</th>
                <th className="border p-2">MT BEEPBEEP</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">{new Date(payment.date).toLocaleDateString()}</td>
                <td className="border p-2">{payment.nbColis}</td>
                <td className="border p-2">{payment.montantRef}</td>
                <td className="border p-2">N/A</td>
                <td className="border p-2">N/A</td>
                <td className="border p-2">N/A</td>
                <td className="border p-2">N/A</td>
                <td className="border p-2">N/A</td>
                <td className="border p-2">N/A</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Colis Details Table */}
        <div className="bg-white p-4 rounded-lg shadow-lg mt-6">
          <h2 className="text-xl font-bold text-gray-700">Détails des Colis</h2>
          <table className="w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border p-2">CODE</th>
                <th className="border p-2">CLIENT</th>
                <th className="border p-2">ADRESSE</th>
                <th className="border p-2">DESIGNATION</th>
                <th className="border p-2">PRIX (TND)</th>
                <th className="border p-2">PRIX BEEPBEEP (TND)</th>
                <th className="border p-2">PRIX VOUS (TND)</th>
                <th className="border p-2">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {payment.colis.map((colis) => (
                <tr key={colis._id} className="border border-gray-100">
                  <td className="border p-2">{colis.code}</td>
                  <td className="border p-2">{colis.nom}</td>
                  <td className="border p-2">{colis.address}</td>
                  <td className="border p-2">{colis.designation}</td>
                  <td className="border p-2">{colis.prix}</td>
                  <td className="border p-2">5</td> {/* Fixed BeepBeep price */}
                  <td className="border p-2">{colis.prix - 5}</td> {/* Your price */}
                  <td className="border p-2">
                    <div className="flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${
                          colis.status === "Delivered"
                            ? "bg-green-500"
                            : colis.status === "Shipped"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                      <p className="text-sm leading-none text-gray-600">{colis.status}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaimenetDetails;