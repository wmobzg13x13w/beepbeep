import React, { useState, useEffect } from "react";
import { GoHome } from "react-icons/go";
import {
  FaBox,
  FaFileImport,
  FaTasks,
  FaClipboardList,
  FaMoneyBill,
  FaUndo,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import logo2 from "../assets/logo2.png";
import axios from "axios";

export default function SidBar() {
  const [isMesColisOpen, setIsMesColisOpen] = useState(false);
  const [isPaimentOpen, setIsPaimentOpen] = useState(false);
  const [isRetourOpen, setIsRetourOpen] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const id = localStorage.getItem("user");
        const response = await axios.get(
          `https://oil-shard-ginger.glitch.me//api/users/user/${id}`
        );
        console.log(response.data);

        if (Array.isArray(response.data) && response.data.length > 0) {
          const firstName = response.data[0].firstName || "";
          const lastName = response.data[0].lastName || "";
          setName(firstName + " " + lastName);
          setEmail(response.data[0].email);
        } else {
          throw new Error("No user data found");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error.message);
      }
    };

    fetchUser();
  }, []);

  const toggleDropdown = (section) => {
    if (section === "mes_colis") setIsMesColisOpen(!isMesColisOpen);
    else if (section === "Mes_Paiment") setIsPaimentOpen(!isPaimentOpen);
    else if (section === "retour") setIsRetourOpen(!isRetourOpen);
  };

  return (
    <nav className='shadow-md h-screen fixed top-0 left-0 w-[260px] bg-white py-6 font-sans overflow-auto z-50 text-gray-800'>
      <div className='relative flex flex-col h-full'>
        {/* Logo */}
        <div className='flex flex-col items-center justify-center mb-6'>
          <img src={logo2} alt='logo2' className='w-[80px]' />
          <img src={logo} alt='logo' className='w-[80px]' />
        </div>

        {/* Sidebar Menu */}
        <ul className='space-y-1 flex-1'>
          <li>
            <Link
              to='/'
              className='flex items-center px-6 py-3 rounded-lg hover:bg-gray-100 transition-all'>
              <GoHome className='mr-3 text-xl text-indigo-700' />
              <span>Dashboard</span>
            </Link>
          </li>

          {/* Mes Colis */}
          <li>
            <button
              onClick={() => toggleDropdown("mes_colis")}
              className='flex items-center w-full text-left px-6 py-3 hover:bg-gray-100 transition-all'>
              <FaBox className='mr-3 text-xl text-indigo-700' />
              <span>Mes Colis</span>
            </button>
            <ul
              className={`pl-10 space-y-1 ${
                isMesColisOpen ? "block" : "hidden"
              }`}>
              {[
                {
                  icon: (
                    <FaClipboardList className='mr-3 text-lg text-indigo-700' />
                  ),
                  text: "Ajoutés Colis",
                  link: "/ajoute",
                },
                {
                  icon: <FaTasks className='mr-3 text-lg text-indigo-700' />,
                  text: "Gérer les Colis",
                  link: "/GestionColis",
                },
                {
                  icon: (
                    <FaClipboardList className='mr-3 text-lg text-indigo-700' />
                  ),
                  text: "Gestion des Manifestes",
                  link: "/manifestes",
                },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.link}
                    className='flex items-center p-3 hover:bg-gray-200 rounded-lg transition'>
                    {item.icon}
                    <span>{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {/* Mes Paiment */}
          <li>
            <button
              onClick={() => toggleDropdown("Mes_Paiment")}
              className='flex items-center w-full text-left px-6 py-3 hover:bg-gray-100 transition-all'>
              <FaBox className='mr-3 text-xl text-indigo-700' />
              <span>Mes Paiment</span>
            </button>
            <ul
              className={`pl-10 space-y-1 ${
                isPaimentOpen ? "block" : "hidden"
              }`}>
              <li>
                <Link
                  to='/paiment'
                  className='flex items-center p-3 hover:bg-gray-200 rounded-lg transition'>
                  <FaMoneyBill className='mr-3 text-lg text-indigo-700' />
                  <span>Paiment</span>
                </Link>
              </li>
            </ul>
          </li>

          {/* Retour */}
          <li>
            <Link
              to='/retour'
              className='flex items-center w-full text-left hover:bg-gray-100 transition-all'>
              <button className='flex items-center w-full text-left px-6 py-3 hover:bg-gray-100 transition-all'>
                <FaUndo className='mr-3 text-xl text-indigo-700' />
                <span>Retour</span>
              </button>
            </Link>
          </li>
        </ul>

        {/* User Profile */}
        <div className='flex items-center cursor-pointer border-t border-gray-200 px-4 py-4 mt-auto'>
          {/* Avatar instead of profile picture */}
          <div className='w-9 h-9 flex items-center justify-center rounded-full border-2 border-indigo-700 bg-indigo-100 text-indigo-700 font-bold text-lg'>
            {name.charAt(0).toUpperCase()}
          </div>
          <div className='ml-4'>
            <p className='text-sm'>{name}</p>
            <p className='text-xs text-gray-500'>{email}</p>
          </div>
        </div>
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className='mt-4 w-[60%] bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg transition-all text-center'>
          Logout
        </button>
      </div>
    </nav>
  );
}
