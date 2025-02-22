import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./SidBar";
import ShartBar from "./shartBar";
import {
  FaDollarSign,
  FaShippingFast,
  FaBoxOpen,
  FaSyncAlt,
  FaLeaf,
} from "react-icons/fa";
import { MdOutlineBackpack } from "react-icons/md";
import { IoIosSync } from "react-icons/io";
import { Icon } from "@iconify/react";

export default function PresidentHome() {
  const [presidentName, setPresidentName] = useState("President");
  const [stats, setStats] = useState({
    paiementStats: [],
    colisStats: [],
    manifestStats: [],
    totalRevenue: 0,
    revenueByMonth: [],
    revenueByWeek: [],
    revenueByDay: [],
  });

  useEffect(() => {
    const userId = localStorage.getItem("user");
    if (userId) {
      axios
        .get(`https://oil-shard-ginger.glitch.me//api/stats/user/${userId}`)
        .then((response) => {
          if (response.data && response.data.username) {
            setPresidentName(response.data.username);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });

      // Fetch stats for the user
      axios
        .get(`https://oil-shard-ginger.glitch.me//api/stats/user/${userId}`)
        .then((response) => {
          setStats(response.data);
        })
        .catch((error) => {
          console.error("Error fetching stats:", error);
        });
    }
  }, []);

  return (
    <div className='flex min-h-screen bg-gray-50'>
      {/* Sidebar */}
      <div className='fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 p-5 z-50'>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className='flex-1 w-full ml-64 p-6 overflow-auto flex flex-row items-center'>
        <div className='w-full flex justify-center mb-8 flex-col'>
          <div className='card w-full'>
            <div className='card-body p-4 pb-0' data-simplebar=''>
              <div className='flex flex-wrap gap-4 justify-center'>
                {/* Display Paiement Stats */}
                {stats.paiementStats.map((stat, index) => (
                  <div key={index} className='flex-shrink-0 w-1/6'>
                    <div className='card primary-gradient'>
                      <div className='card-body text-center px-9 pb-4'>
                        <div className='d-flex align-items-center justify-content-center round-48 rounded text-bg-primary flex-shrink-0 mb-3 mx-auto'>
                          <FaDollarSign className='fs-7 text-white' />
                        </div>
                        <h6 className='fw-normal fs-3 mb-1'>{stat._id}</h6>
                        <h4 className='mb-3 d-flex align-items-center justify-content-center gap-1'>
                          {stat.count}
                        </h4>
                        <a
                          href='javascript:void(0)'
                          className='btn btn-white fs-2 fw-semibold text-nowrap'>
                          View Details
                        </a>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Display Colis Stats */}
                {stats.colisStats.map((stat, index) => (
                  <div key={index} className='flex-shrink-0 w-1/6'>
                    <div className='card warning-gradient'>
                      <div className='card-body text-center px-9 pb-4'>
                        <div className='d-flex align-items-center justify-content-center round-48 rounded text-bg-warning flex-shrink-0 mb-3 mx-auto'>
                          <FaShippingFast className='fs-7 text-white' />
                        </div>
                        <h6 className='fw-normal fs-3 mb-1'>{stat._id}</h6>
                        <h4 className='mb-3 d-flex align-items-center justify-content-center gap-1'>
                          {stat.count}
                        </h4>
                        <a
                          href='javascript:void(0)'
                          className='btn btn-white fs-2 fw-semibold text-nowrap'>
                          View Details
                        </a>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Display Manifest Stats */}
                {stats.manifestStats.map((stat, index) => (
                  <div key={index} className='flex-shrink-0 w-1/6'>
                    <div className='card secondary-gradient'>
                      <div className='card-body text-center px-9 pb-4'>
                        <div className='d-flex align-items-center justify-content-center round-48 rounded text-bg-secondary flex-shrink-0 mb-3 mx-auto'>
                          <MdOutlineBackpack className='fs-7 text-white' />
                        </div>
                        <h6 className='fw-normal fs-3 mb-1'>{stat._id}</h6>
                        <h4 className='mb-3 d-flex align-items-center justify-content-center gap-1'>
                          {stat.count}
                        </h4>
                        <a
                          href='javascript:void(0)'
                          className='btn btn-white fs-2 fw-semibold text-nowrap'>
                          View Details
                        </a>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Display Total Revenue */}
                <div className='flex-shrink-0 w-1/6'>
                  <div className='card success-gradient'>
                    <div className='card-body text-center px-9 pb-4'>
                      <div className='d-flex align-items-center justify-content-center round-48 rounded text-bg-success flex-shrink-0 mb-3 mx-auto'>
                        <FaLeaf className='fs-7 text-white' />
                      </div>
                      <h6 className='fw-normal fs-3 mb-1'>Total Revenue</h6>
                      <h4 className='mb-3 d-flex align-items-center justify-content-center gap-1'>
                        {stats.totalRevenue}
                      </h4>
                      <a
                        href='javascript:void(0)'
                        className='btn btn-white fs-2 fw-semibold text-nowrap'>
                        View Details
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced ShartBar Component */}
          <div className='w-full max-w-7xl mt-8 px-4 py-6 bg-white shadow-lg rounded-xl'>
            <div className='text-center mb-6'>
              <h3 className='text-2xl font-semibold text-gray-800'>
                Sales Chart Overview
              </h3>
            </div>
            <div className='chart-container bg-gray-100 p-6 rounded-lg'>
              <ShartBar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
