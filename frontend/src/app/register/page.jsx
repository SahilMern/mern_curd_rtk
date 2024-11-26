"use client";
import { CiUser } from "react-icons/ci";
import {
  MdOutlineEmail,
  MdOutlinePhoneEnabled,
  MdOutlineRealEstateAgent,
} from "react-icons/md";
import { PiAddressBookThin, PiCityLight } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import { FaPlaceOfWorship } from "react-icons/fa";
import { useState } from "react";
import { backendurlForUserRegister } from "../helpers/backend";
import { useRouter } from 'next/navigation';

const Register = () => {
  const router = useRouter();
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    location: "",
    city: "",
    state: "",
    country: "",
    password: "",
    confirmPassword: ""
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleForm = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch(`${backendurlForUserRegister}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInput),
      });

      const data = await response.json();
      if(data.status === true){
        alert("User registered successfully");
        router.push("/login");
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 py-10">
      <div className="w-full max-w-4xl px-8 py-10 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-[#333]">Create Your Account</h2>

        {/* Input Fields */}
        <form onSubmit={handleForm}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">

            {/* Username */}
            <div className="inputBox relative">
              <CiUser className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#636380]" />
              <input
                type="text"
                id="username"
                placeholder="Username"
                className="w-full pl-12 pr-4 py-3 rounded-lg focus:outline-none bg-[#f9f9f9] text-[#333] border border-[#ddd] shadow-sm focus:border-blue-500"
                autoComplete="off"
                value={userInput.username}
                name="username"
                onChange={handleInput}
                required
              />
            </div>

            {/* Email */}
            <div className="inputBox relative">
              <MdOutlineEmail className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#636380]" />
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="w-full pl-12 pr-4 py-3 rounded-lg focus:outline-none bg-[#f9f9f9] text-[#333] border border-[#ddd] shadow-sm focus:border-blue-500"
                autoComplete="off"
                value={userInput.email}
                name="email"
                onChange={handleInput}
                required
              />
            </div>

            {/* Phone */}
            <div className="inputBox relative">
              <MdOutlinePhoneEnabled className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#636380]" />
              <input
                type="text"
                id="phone"
                placeholder="Phone Number"
                className="w-full pl-12 pr-4 py-3 rounded-lg focus:outline-none bg-[#f9f9f9] text-[#333] border border-[#ddd] shadow-sm focus:border-blue-500"
                autoComplete="off"
                value={userInput.phone}
                name="phone"
                onChange={handleInput}
                required
              />
            </div>

            {/* Address */}
            <div className="inputBox relative col-span-2">
              <PiAddressBookThin className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#636380]" />
              <input
                type="text"
                id="address"
                placeholder="Address"
                className="w-full pl-12 pr-4 py-3 rounded-lg focus:outline-none bg-[#f9f9f9] text-[#333] border border-[#ddd] shadow-sm focus:border-blue-500"
                autoComplete="off"
                value={userInput.address}
                name="address"
                onChange={handleInput}
                required
              />
            </div>

            {/* Location */}
            <div className="inputBox relative">
              <CiLocationOn className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#636380]" />
              <input
                type="text"
                id="location"
                placeholder="Location"
                className="w-full pl-12 pr-4 py-3 rounded-lg focus:outline-none bg-[#f9f9f9] text-[#333] border border-[#ddd] shadow-sm focus:border-blue-500"
                autoComplete="off"
                value={userInput.location}
                name="location"
                onChange={handleInput}
                required
              />
            </div>

            {/* City */}
            <div className="inputBox relative">
              <PiCityLight className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#636380]" />
              <input
                type="text"
                id="city"
                placeholder="City"
                className="w-full pl-12 pr-4 py-3 rounded-lg focus:outline-none bg-[#f9f9f9] text-[#333] border border-[#ddd] shadow-sm focus:border-blue-500"
                autoComplete="off"
                value={userInput.city}
                name="city"
                onChange={handleInput}
                required
              />
            </div>

            {/* State */}
            <div className="inputBox relative">
              <MdOutlineRealEstateAgent className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#636380]" />
              <input
                type="text"
                id="state"
                placeholder="State"
                className="w-full pl-12 pr-4 py-3 rounded-lg focus:outline-none bg-[#f9f9f9] text-[#333] border border-[#ddd] shadow-sm focus:border-blue-500"
                autoComplete="off"
                value={userInput.state}
                name="state"
                onChange={handleInput}
                required
              />
            </div>

            {/* Country */}
            <div className="inputBox relative">
              <FaPlaceOfWorship className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#636380]" />
              <input
                type="text"
                id="country"
                placeholder="Country"
                className="w-full pl-12 pr-4 py-3 rounded-lg focus:outline-none bg-[#f9f9f9] text-[#333] border border-[#ddd] shadow-sm focus:border-blue-500"
                autoComplete="off"
                value={userInput.country}
                name="country"
                onChange={handleInput}
                required
              />
            </div>

            {/* Password */}
            <div className="inputBox relative col-span-2">
              <CiUser className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#636380]" />
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-3 rounded-lg focus:outline-none bg-[#f9f9f9] text-[#333] border border-[#ddd] shadow-sm focus:border-blue-500"
                autoComplete="off"
                value={userInput.password}
                name="password"
                onChange={handleInput}
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="inputBox relative col-span-2">
              <CiUser className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#636380]" />
              <input
                type="password"
                id="cpassword"
                placeholder="Confirm Password"
                className="w-full pl-12 pr-4 py-3 rounded-lg focus:outline-none bg-[#f9f9f9] text-[#333] border border-[#ddd] shadow-sm focus:border-blue-500"
                autoComplete="off"
                value={userInput.confirmPassword}
                name="confirmPassword"
                onChange={handleInput}
                required
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Register
            </button>

          </div>

          <div className="mt-4 text-sm text-[#636380]">
            <p>Already have an account? 
              <a href="/login" className="text-blue-600 hover:underline"> Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
