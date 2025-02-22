import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    country: "",
    city: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate(); // Using useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://oil-shard-ginger.glitch.me/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();
      setSuccessMessage("Registration successful!");
      setError(null);

      // Show toast notification for success
      toast.success("Registration successful!");

      // Redirect after 3 seconds
      setTimeout(() => {
        navigate("/confirm-account"); // Adjust the path as needed
      }, 3000);
    } catch (err) {
      setError(err.message);
      setSuccessMessage(null);
      toast.error(err.message); // Show toast notification for error
    }
  };

  return (
    <div className='md:w-1/2 flex flex-col items-center justify-center bg-white p-8 shadow-lg relative'>
      {/* Form */}
      <form className='w-full max-w-md space-y-4' onSubmit={handleSubmit}>
        {/* Input Fields */}
        {[
          { label: "Username", name: "username", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "First Name", name: "firstName", type: "text" },
          { label: "Last Name", name: "lastName", type: "text" },
          { label: "Phone Number", name: "phoneNumber", type: "text" },
          { label: "Country", name: "country", type: "text" },
          { label: "City", name: "city", type: "text" },
          { label: "Password", name: "password", type: "password" },
        ].map((field) => (
          <div key={field.name} className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-semibold mb-2'
              htmlFor={field.name}>
              {field.label}
            </label>
            <input
              className='shadow-sm border rounded w-full py-2 px-3 border-gray-300'
              id={field.name}
              name={field.name}
              type={field.type}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.label}
            />
          </div>
        ))}

        {/* Submit Button */}
        <button
          type='submit'
          className='bg-second hover:bg-second text-white text-sm py-2 px-6 rounded-lg'>
          Register
        </button>
      </form>

      {/* Success or Error Messages */}
      {successMessage && (
        <p className='text-green-500 text-sm mt-4'>{successMessage}</p>
      )}
      {error && <p className='text-red-500 text-sm mt-4'>{error}</p>}
    </div>
  );
};

export default RegisterForm;
