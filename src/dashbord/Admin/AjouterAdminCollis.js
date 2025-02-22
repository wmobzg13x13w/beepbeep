import React, { useState } from "react";
import SidBar from "../SidBar";

export default function AjouterAdminCollis() {
  // Retrieve the user ID and agence (username) from local storage
  const userId = localStorage.getItem("user");
  const agence = localStorage.getItem("username"); // Assuming you store the username in localStorage

  const [formData, setFormData] = useState({
    code: "",
    prix: "",
    nbrPieces: 1, // Changed from `nbPieces` to `nbrPieces`
    designation: "",
    poids: "",
    echange: false, // Changed to boolean
    type: "fix", // Default to "fix" to match the model's enum
    fragile: false, // Changed to boolean
    nom: "",
    address: "", // Changed from `adresse` to `address`
    tel: "",
    tel2: "",
    couvernant: "", // Changed from `gouvernorat` to `couvernant`
    delegation: "",
    localite: "",
    commentaire: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Handle boolean fields (`echange` and `fragile`)
    if (type === "checkbox" || name === "echange" || name === "fragile") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare the data to send to the backend
      const payload = {
        ...formData,
        expediteur: userId, // Add the user ID from local storage
        agence: agence, // Add the agence (username) from local storage
      };

      // Send a POST request to the backend
      const response = await fetch(
        `https://oil-shard-ginger.glitch.me/api/colis/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create colis");
      }

      const data = await response.json();
      console.log("Colis created:", data);
      alert("Colis created successfully!");

      // Optionally, reset the form after successful submission
      setFormData({
        code: "",
        prix: "",
        nbrPieces: 1,
        designation: "",
        poids: "",
        echange: false,
        type: "fix",
        fragile: false,
        nom: "",
        address: "",
        tel: "",
        tel2: "",
        couvernant: "",
        delegation: "",
        localite: "",
        commentaire: "",
      });
    } catch (error) {
      console.error("Error creating colis:", error);
      alert("Failed to create colis");
    }
  };

  return (
    <div className='flex min-h-screen bg-gray-50'>
      {/* Sidebar */}
      <div className='fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 p-5 z-50'>
        <SidBar />
      </div>

      {/* Main Content */}
      <div className='flex-1 ml-64 p-6 overflow-auto'>
        <div className='max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg'>
          <h2 className='text-2xl font-bold text-center mb-8 text-blue-600'>
            Ajouter un Colis pour Livraison
          </h2>
          <form className='space-y-8' onSubmit={handleSubmit}>
            {/* Grid for Colis and Client Information */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
              {/* Colis Information Section */}
              <div className='bg-gray-50 p-6 rounded-lg shadow-inner'>
                <h3 className='text-xl font-semibold text-gray-800 mb-6 border-b pb-2'>
                  Informations du Colis
                </h3>
                <div className='space-y-6'>
                  <div>
                    <label
                      htmlFor='code'
                      className='block font-medium text-gray-700 mb-2'>
                      Code *
                    </label>
                    <input
                      type='text'
                      id='code'
                      name='code'
                      value={formData.code}
                      onChange={handleChange}
                      className='w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='prix'
                      className='block font-medium text-gray-700 mb-2'>
                      Prix (en TND) *
                    </label>
                    <input
                      type='number'
                      id='prix'
                      name='prix'
                      value={formData.prix}
                      onChange={handleChange}
                      className='w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='nbrPieces'
                      className='block font-medium text-gray-700 mb-2'>
                      NB Pièces ?
                    </label>
                    <input
                      type='number'
                      id='nbrPieces'
                      name='nbrPieces'
                      value={formData.nbrPieces}
                      onChange={handleChange}
                      className='w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='designation'
                      className='block font-medium text-gray-700 mb-2'>
                      Désignation *
                    </label>
                    <input
                      type='text'
                      id='designation'
                      name='designation'
                      value={formData.designation}
                      onChange={handleChange}
                      className='w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='poids'
                      className='block font-medium text-gray-700 mb-2'>
                      Poids (Kg) *
                    </label>
                    <input
                      type='number'
                      id='poids'
                      name='poids'
                      value={formData.poids}
                      onChange={handleChange}
                      step='0.01'
                      placeholder='exp: 1,200'
                      className='w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      required
                    />
                  </div>
                  <div>
                    <label className='block font-medium text-gray-700 mb-2'>
                      Echange *
                    </label>
                    <div className='flex items-center space-x-6'>
                      <label className='inline-flex items-center'>
                        <input
                          type='checkbox'
                          name='echange'
                          checked={formData.echange}
                          onChange={handleChange}
                          className='h-5 w-5 border-gray-300 text-blue-600 focus:ring-blue-500'
                        />
                        <span className='ml-2'>Oui</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor='type'
                      className='block font-medium text-gray-700 mb-2'>
                      Type *
                    </label>
                    <select
                      id='type'
                      name='type'
                      value={formData.type}
                      onChange={handleChange}
                      className='w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      required>
                      <option value='fix'>FIX</option>
                      <option value='onp'>ONP</option>
                      <option value='blk'>BLK</option>
                      <option value='smd'>SMD</option>
                    </select>
                  </div>
                  <div>
                    <label className='block font-medium text-gray-700 mb-2'>
                      Fragile ?
                    </label>
                    <div className='flex items-center space-x-6'>
                      <label className='inline-flex items-center'>
                        <input
                          type='checkbox'
                          name='fragile'
                          checked={formData.fragile}
                          onChange={handleChange}
                          className='h-5 w-5 border-gray-300 text-blue-600 focus:ring-blue-500'
                        />
                        <span className='ml-2'>Oui</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Client Information Section */}
              <div className='bg-gray-50 p-6 rounded-lg shadow-inner'>
                <h3 className='text-xl font-semibold text-gray-800 mb-6 border-b pb-2'>
                  Informations du Client
                </h3>
                <div className='space-y-6'>
                  <div>
                    <label
                      htmlFor='nom'
                      className='block font-medium text-gray-700 mb-2'>
                      Nom *
                    </label>
                    <input
                      type='text'
                      id='nom'
                      name='nom'
                      value={formData.nom}
                      onChange={handleChange}
                      className='w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='address'
                      className='block font-medium text-gray-700 mb-2'>
                      Adresse *
                    </label>
                    <input
                      type='text'
                      id='address'
                      name='address'
                      value={formData.address}
                      onChange={handleChange}
                      className='w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='tel'
                      className='block font-medium text-gray-700 mb-2'>
                      Tel *
                    </label>
                    <input
                      type='tel'
                      id='tel'
                      name='tel'
                      value={formData.tel}
                      onChange={handleChange}
                      className='w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='tel2'
                      className='block font-medium text-gray-700 mb-2'>
                      Tel2
                    </label>
                    <input
                      type='tel'
                      id='tel2'
                      name='tel2'
                      value={formData.tel2}
                      onChange={handleChange}
                      className='w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='couvernant'
                      className='block font-medium text-gray-700 mb-2'>
                      Gouvernorat *
                    </label>
                    <input
                      type='text'
                      id='couvernant'
                      name='couvernant'
                      value={formData.couvernant}
                      onChange={handleChange}
                      className='w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='delegation'
                      className='block font-medium text-gray-700 mb-2'>
                      Délégation *
                    </label>
                    <input
                      type='text'
                      id='delegation'
                      name='delegation'
                      value={formData.delegation}
                      onChange={handleChange}
                      className='w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='localite'
                      className='block font-medium text-gray-700 mb-2'>
                      Localité *
                    </label>
                    <input
                      type='text'
                      id='localite'
                      name='localite'
                      value={formData.localite}
                      onChange={handleChange}
                      className='w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='commentaire'
                      className='block font-medium text-gray-700 mb-2'>
                      Commentaire *
                    </label>
                    <textarea
                      id='commentaire'
                      name='commentaire'
                      value={formData.commentaire}
                      onChange={handleChange}
                      className='w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      required></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className='flex justify-center mt-8'>
              <button
                type='submit'
                className='px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300'>
                Soumettre
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
