import React from "react";
import SidBar from "./SidBar"; // Ensure this component is correctly imported

const ImportColis = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 p-5 z-50">
        <SidBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
            IMPORT DES COLIS
          </h1>

          <div className="space-y-6">
            {/* File Template Download */}
            <div className="text-center">
              <p className="text-gray-700 mb-4 font-medium">
                Modèle de fichier à télécharger:
              </p>
              <button className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                Télécharger
              </button>
            </div>

            {/* File Upload */}
            <div className="flex flex-col items-center space-y-4">
              <input type="file" className="hidden" id="fileInput" />
              <label
                htmlFor="fileInput"
                className="bg-gray-200 px-5 py-2 rounded-lg cursor-pointer hover:bg-gray-300 transition duration-300 shadow"
              >
                Choisir un fichier
              </label>
              <p className="text-gray-500">Aucun fichier choisi</p>
            </div>

            {/* Upload & Import Buttons */}
            <div className="flex justify-center space-x-4">
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-300">
                Charger le fichier Excel
              </button>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                Importer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportColis;
