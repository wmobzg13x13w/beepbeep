import React, { useState } from "react";
import axios from "axios";
import SidBar from "./PresidentSideBar";
import PresidentSideBar from "./PresidentSideBar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ReportForm = () => {
  const [formData, setFormData] = useState({
    communication: { vpnRating: 0, committeeRating: 0 },
    visits: {
      vpnVisits: 0,
      partnershipSigned: false,
      partnerName: "",
      partnershipObjective: "",
    },
    activities: {
      meetingsOrganized: false,
      meetingStructures: [],
      actionOrganized: false,
      actionTitle: "",
      actionTheme: "",
      generalAssembly: false,
      totalMeetings: 0,
    },
    programs: [],
    trainings: [],
    collaborations: [],
    newMembers: { count: 0, integrationMethod: "" },
    mediaPresence: {
      tvRadioPresence: false,
      tvRadioCount: 0,
      tvRadioTopic: "",
      socialMediaUsage: false,
      postCount: 0,
    },
    issues: {
      localStructureIssues: false,
      localStructureName: "",
      olmIssues: false,
      olmDetails: "",
    },
    finance: {
      bankAccountTransfer: false,
      bankTransferDifficulties: "",
      jvcAccountTransfer: false,
      jvcAccountCount: 0,
      jvcIssues: false,
      jvcIssueDetails: "",
    },
    planning: {
      nextMonthPlan: false,
      nextMonthGoals: "",
      lastMonthFollowUp: false,
      followUpDetails: "",
    },
    performance: {
      objectivesMet: false,
      unfinishedObjectives: "",
      kpiImprovement: "",
      obstacles: "",
    },
    // additionalComments: '',
    user: localStorage.getItem("user"),
  });
  const navigate = useNavigate();
  const handleChange = (e, section, field, index) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    // Ensure the section exists in formData before updating
    if (formData[section] === undefined) {
      // If section does not exist, initialize it as an object
      setFormData({ ...formData, [section]: {} });
    }

    if (index !== undefined) {
      // Ensure section is an array and exists
      if (Array.isArray(formData[section])) {
        const updatedArray = [...formData[section]];
        updatedArray[index] = {
          ...updatedArray[index],
          [field]: value,
        };
        setFormData({ ...formData, [section]: updatedArray });
      }
    } else {
      // Ensure section is an object and field is properly updated
      if (formData[section]) {
        setFormData({
          ...formData,
          [section]: {
            ...formData[section],
            [field]: value,
          },
        });
      }
    }
  };

  const addSection = (section) => {
    setFormData({ ...formData, [section]: [...formData[section], {}] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://oil-shard-ginger.glitch.me//api/reports",
        formData
      );
      console.log("Form submitted successfully:", response.data);

      // Show success toast
      toast.success("Form submitted successfully!", {
        position: "top-right",
        autoClose: 3000, // Closes after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Navigate after a delay (ensuring user sees the toast)
      setTimeout(() => {
        navigate("/Presidentreport"); // Change to your desired route
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form. Please try again.");
    }
  };
  return (
    <div className='flex h-screen bg-gray-50'>
      <aside>
        <div className='fixed inset-0 w-64 bg-white border-r border-gray-200 p-5'>
          <PresidentSideBar />
        </div>
      </aside>
      <div className='flex-1 ml-64 p-6 overflow-auto'>
        <form onSubmit={handleSubmit} className='space-y-6 p-6 bg-gray-100'>
          {/* Section Communication */}
          <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-xl font-bold mb-4'>Communication</h2>
            <div className='grid grid-cols-2 gap-4'>
              <input
                type='number'
                min='1'
                max='5'
                placeholder='Note VPN'
                onChange={(e) => handleChange(e, "communication", "vpnRating")}
                className='border rounded p-2'
              />
              <input
                type='number'
                min='1'
                max='5'
                placeholder='Note du Comité'
                onChange={(e) =>
                  handleChange(e, "communication", "committeeRating")
                }
                className='border rounded p-2'
              />
            </div>
          </div>

          {/* Section Visites */}
          <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-xl font-bold mb-4'>Visites</h2>
            <div className='grid grid-cols-2 gap-4'>
              <input
                type='number'
                min='1'
                max='5'
                placeholder='Visites VPN'
                onChange={(e) => handleChange(e, "visits", "vpnVisits")}
                className='border rounded p-2'
              />
            </div>
          </div>
          <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-xl font-bold mb-4'>Partenariat</h2>
            <div className='grid grid-cols-2 gap-4'>
              <label className='block'>
                <input
                  type='checkbox'
                  onChange={(e) =>
                    handleChange(e, "visits", "partnershipSigned")
                  }
                  className='mr-2'
                />
                Partenariat Signé
              </label>
              <input
                type='text'
                placeholder='Objectif du Partenariat'
                onChange={(e) =>
                  handleChange(e, "visits", "partnershipObjective")
                }
                className='border rounded p-2'
              />
              <input
                type='text'
                placeholder='Nom du Partenaire'
                onChange={(e) => handleChange(e, "visits", "partnerName")}
                className='border rounded p-2'
              />
            </div>
          </div>
          {/* Section Activités */}
          <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-xl font-bold mb-4'>Activités</h2>
            <div className='grid grid-cols-2 gap-4'>
              <label className='block'>
                <input
                  type='checkbox'
                  onChange={(e) =>
                    handleChange(e, "activities", "meetingsOrganized")
                  }
                  className='mr-2'
                />
                Réunions Organisées avec des Structure
              </label>
              <input
                type='text'
                placeholder='Structures des Réunions'
                onChange={(e) =>
                  handleChange(e, "activities", "meetingStructures")
                }
                className='border rounded p-2'
              />
            </div>
          </div>

          {/* Section Programmes */}
          <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-xl font-bold mb-4'>Programmes</h2>
            {formData.programs.map((program, index) => (
              <div key={index} className='grid grid-cols-2 gap-4 mb-4'>
                <input
                  type='text'
                  placeholder='Nom du Programme'
                  onChange={(e) =>
                    handleChange(e, "programs", "programName", index)
                  }
                  className='border rounded p-2'
                />
              </div>
            ))}
            <button
              type='button'
              onClick={() => addSection("programs")}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              Ajouter un Programme
            </button>
          </div>

          {/* Section Formations */}
          <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-xl font-bold mb-4'>Formations</h2>
            {formData.trainings.map((training, index) => (
              <div key={index} className='grid grid-cols-2 gap-4 mb-4'>
                <input
                  type='text'
                  placeholder='Titre'
                  onChange={(e) => handleChange(e, "trainings", "title", index)}
                  className='border rounded p-2'
                />
                <input
                  type='text'
                  placeholder='Nom du Formateur'
                  onChange={(e) =>
                    handleChange(e, "trainings", "trainerName", index)
                  }
                  className='border rounded p-2'
                />
                <input
                  type='number'
                  placeholder='Participants'
                  onChange={(e) =>
                    handleChange(e, "trainings", "participants", index)
                  }
                  className='border rounded p-2'
                />
              </div>
            ))}
            <button
              type='button'
              onClick={() => addSection("trainings")}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              Ajouter une Formation
            </button>
          </div>

          {/* Section Collaborations */}
          <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-xl font-bold mb-4'>Collaborations</h2>
            {formData.collaborations.map((collaboration, index) => (
              <div key={index} className='grid grid-cols-2 gap-4 mb-4'>
                <input
                  type='text'
                  placeholder='Noms des OLM'
                  onChange={(e) =>
                    handleChange(e, "collaborations", "olmNames", index)
                  }
                  className='border rounded p-2'
                />
                <input
                  type='text'
                  placeholder='Titre de la Formation'
                  onChange={(e) =>
                    handleChange(e, "collaborations", "trainingTitle", index)
                  }
                  className='border rounded p-2'
                />
                <input
                  type='text'
                  placeholder='Nom du Formateur'
                  onChange={(e) =>
                    handleChange(e, "collaborations", "trainerName", index)
                  }
                  className='border rounded p-2'
                />
                <input
                  type='number'
                  placeholder='Participants'
                  onChange={(e) =>
                    handleChange(e, "collaborations", "participants", index)
                  }
                  className='border rounded p-2'
                />
              </div>
            ))}
            <button
              type='button'
              onClick={() => addSection("collaborations")}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              Ajouter une Collaboration
            </button>
          </div>

          {/* Section Nouveaux Membres */}
          <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-xl font-bold mb-4'>Nouveaux Membres</h2>
            <div className='grid grid-cols-2 gap-4'>
              <input
                type='number'
                placeholder='Nombre'
                onChange={(e) => handleChange(e, "newMembers", "count")}
                className='border rounded p-2'
              />
              <input
                type='text'
                placeholder="Méthode d'Intégration"
                onChange={(e) =>
                  handleChange(e, "newMembers", "integrationMethod")
                }
                className='border rounded p-2'
              />
            </div>
          </div>

          {/* Section Présence Médiatique */}
          <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-xl font-bold mb-4'>Présence Médiatique</h2>
            <div className='grid grid-cols-2 gap-4'>
              <label className='block'>
                <input
                  type='checkbox'
                  onChange={(e) =>
                    handleChange(e, "mediaPresence", "tvRadioPresence")
                  }
                  className='mr-2'
                />
                Présence TV/Radio
              </label>
              <input
                type='number'
                placeholder='Nombre de passages TV/Radio'
                onChange={(e) =>
                  handleChange(e, "mediaPresence", "tvRadioCount")
                }
                className='border rounded p-2'
              />
              <input
                type='text'
                placeholder='Sujet TV/Radio'
                onChange={(e) =>
                  handleChange(e, "mediaPresence", "tvRadioTopic")
                }
                className='border rounded p-2'
              />
              <label className='block'>
                <input
                  type='checkbox'
                  onChange={(e) =>
                    handleChange(e, "mediaPresence", "socialMediaUsage")
                  }
                  className='mr-2'
                />
                Utilisation des Réseaux Sociaux
              </label>
              <input
                type='number'
                placeholder='Nombre de Publications'
                onChange={(e) => handleChange(e, "mediaPresence", "postCount")}
                className='border rounded p-2'
              />
            </div>
          </div>

          {/* Section Problèmes */}
          <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-xl font-bold mb-4'>Problèmes</h2>
            <div className='grid grid-cols-2 gap-4'>
              <label className='block'>
                <input
                  type='checkbox'
                  onChange={(e) =>
                    handleChange(e, "issues", "localStructureIssues")
                  }
                  className='mr-2'
                />
                Problèmes de Structure Locale
              </label>
              <input
                type='text'
                placeholder='Nom de la Structure Locale'
                onChange={(e) =>
                  handleChange(e, "issues", "localStructureName")
                }
                className='border rounded p-2'
              />
              <label className='block'>
                <input
                  type='checkbox'
                  onChange={(e) => handleChange(e, "issues", "olmIssues")}
                  className='mr-2'
                />
                Problèmes OLM
              </label>
              <input
                type='text'
                placeholder='Détails des Problèmes OLM'
                onChange={(e) => handleChange(e, "issues", "olmDetails")}
                className='border rounded p-2'
              />
            </div>
          </div>

          {/* Section Finance */}
          <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-xl font-bold mb-4'>Finance</h2>
            <div className='grid grid-cols-2 gap-4'>
              <label className='block'>
                <input
                  type='checkbox'
                  onChange={(e) =>
                    handleChange(e, "finance", "bankAccountTransfer")
                  }
                  className='mr-2'
                />
                Transfert de Compte Bancaire
              </label>
              <input
                type='text'
                placeholder='Difficultés de Transfert Bancaire'
                onChange={(e) =>
                  handleChange(e, "finance", "bankTransferDifficulties")
                }
                className='border rounded p-2'
              />
              <label className='block'>
                <input
                  type='checkbox'
                  onChange={(e) =>
                    handleChange(e, "finance", "jvcAccountTransfer")
                  }
                  className='mr-2'
                />
                Transfert de Compte JVC
              </label>
              <input
                type='number'
                placeholder='Nombre de Comptes JVC'
                onChange={(e) => handleChange(e, "finance", "jvcAccountCount")}
                className='border rounded p-2'
              />
              <label className='block'>
                <input
                  type='checkbox'
                  onChange={(e) => handleChange(e, "finance", "jvcIssues")}
                  className='mr-2'
                />
                Problèmes JVC
              </label>
              <input
                type='text'
                placeholder='Détails des Problèmes JVC'
                onChange={(e) => handleChange(e, "finance", "jvcIssueDetails")}
                className='border rounded p-2'
              />
            </div>
          </div>

          {/* Section Planification */}
          <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-xl font-bold mb-4'>Planification</h2>
            <div className='grid grid-cols-2 gap-4'>
              <label className='block'>
                <input
                  type='checkbox'
                  onChange={(e) => handleChange(e, "planning", "nextMonthPlan")}
                  className='mr-2'
                />
                Plan du Mois Prochain
              </label>
              <input
                type='text'
                placeholder='Objectifs du Mois Prochain'
                onChange={(e) => handleChange(e, "planning", "nextMonthGoals")}
                className='border rounded p-2'
              />
            </div>
          </div>

          {/* Section Performance */}
          <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-xl font-bold mb-4'>Performance</h2>
            <div className='grid grid-cols-2 gap-4'>
              <label className='block'>
                <input
                  type='checkbox'
                  onChange={(e) =>
                    handleChange(e, "performance", "objectivesMet")
                  }
                  className='mr-2'
                />
                Objectifs Atteints
              </label>
              <input
                type='text'
                placeholder='Objectifs Non Terminés'
                onChange={(e) =>
                  handleChange(e, "performance", "unfinishedObjectives")
                }
                className='border rounded p-2'
              />
              <input
                type='text'
                placeholder='Amélioration des KPI'
                onChange={(e) =>
                  handleChange(e, "performance", "kpiImprovement")
                }
                className='border rounded p-2'
              />
              <input
                type='text'
                placeholder='Obstacles'
                onChange={(e) => handleChange(e, "performance", "obstacles")}
                className='border rounded p-2'
              />
            </div>
          </div>

          {/* Section Commentaires Supplémentaires */}
          {/* <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-xl font-bold mb-4">Commentaires Supplémentaires</h2>
                <textarea onChange={(e) => handleChange(e, 'additionalComments')} className="border rounded p-2 w-full" ></textarea>
            </div> */}

          {/* Bouton de Soumission */}
          <button
            type='submit'
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
            Soumettre le Rapport
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;
