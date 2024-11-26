"use client";
import {
  backendurlForSingleUser,
  backendurlForUpdateUser,
} from "@/app/helpers/backend";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiLocationOn, CiUser } from "react-icons/ci";
import {
  MdOutlineEmail,
  MdOutlinePhoneEnabled,
  MdOutlineRealEstateAgent,
} from "react-icons/md";
import { PiAddressBookThin, PiCityLight } from "react-icons/pi";

const Page = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    location: "",
    city: "",
    state: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  useEffect(() => {
    const fetchSingleUserDetails = async () => {
      try {
        const response = await fetch(`${backendurlForSingleUser}/${id}`);
        const data = await response.json();

        if (data.status === true) {
          setUser(data.user);
        } else {
          console.error("Failed to fetch user data");
          setUser({
            username: "",
            email: "",
            phone: "",
            location: "",
            city: "",
            state: "",
            address: "",
            password: "",
            confirmPassword: "",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser({
          username: "",
          email: "",
          phone: "",
          location: "",
          city: "",
          state: "",
          address: "",
          password: "",
          confirmPassword: "",
        });
      }
    };

    if (id) {
      fetchSingleUserDetails();
    } else {
      console.error("Invalid or undefined ID");
      router.push("/error");
    }
  }, [id, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateUser = async () => {
    try {
      const response = await fetch(`${backendurlForUpdateUser}/${id}`, {
        method: "PATCH", // Changed to PATCH
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      console.log(data, "data");

      if (data.status === true) {
        alert("User updated successfully");
        router.push("/")

      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4 md:px-16">
      <div className="w-full max-w-4xl mx-auto flex flex-wrap justify-between items-center gap-6 p-6 bg-white shadow-md rounded-lg">
        {/* Username */}
        <div className="inputBox relative border-2 rounded-lg border-[#b0b0b1] w-full md:w-[45%]">
          <CiUser className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#636380]" />
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="w-full pl-12 pr-4 py-2 rounded-lg focus:outline-none text-[#636380]"
            autoComplete="off"
            name="username"
            value={user.username || ""}
            onChange={handleChange}
          />
        </div>
        {/* Email */}
        <div className="inputBox relative border-2 rounded-lg border-[#b0b0b1] w-full md:w-[45%]">
          <MdOutlineEmail className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#636380]" />
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="w-full pl-12 pr-4 py-2 rounded-lg focus:outline-none text-[#636380]"
            autoComplete="off"
            name="email"
            value={user.email || ""}
            onChange={handleChange}
          />
        </div>
        {/* Phone Number */}
        <div className="inputBox relative border-2 rounded-lg border-[#b0b0b1] w-full md:w-[45%]">
          <MdOutlinePhoneEnabled className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#636380]" />
          <input
            type="text"
            id="phone"
            placeholder="Phone Number"
            className="w-full pl-12 pr-4 py-2 rounded-lg focus:outline-none text-[#636380]"
            autoComplete="off"
            name="phone"
            value={user.phone || ""}
            onChange={handleChange}
          />
        </div>
        {/* Location */}
        <div className="inputBox relative border-2 rounded-lg border-[#b0b0b1] w-full md:w-[45%]">
          <CiLocationOn className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#636380]" />
          <input
            type="text"
            id="location"
            placeholder="Location"
            className="w-full pl-12 pr-4 py-2 rounded-lg focus:outline-none text-[#636380]"
            autoComplete="off"
            name="location"
            value={user.location || ""}
            onChange={handleChange}
          />
        </div>

        {/* City */}
        <div className="inputBox relative border-2 rounded-lg border-[#b0b0b1] w-full md:w-[45%]">
          <PiCityLight className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#636380]" />
          <input
            type="text"
            id="city"
            placeholder="City"
            className="w-full pl-12 pr-4 py-2 rounded-lg focus:outline-none text-[#636380] outline-none"
            autoComplete="off"
            name="city"
            value={user.city || ""}
            onChange={handleChange}
          />
        </div>

        {/* State */}
        <div className="inputBox relative border-2 rounded-lg border-[#b0b0b1] w-full md:w-[45%]">
          <MdOutlineRealEstateAgent className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#636380]" />
          <input
            type="text"
            id="state"
            placeholder="State"
            className="w-full pl-12 pr-4 py-2 rounded-lg focus:outline-none text-[#636380] outline-none"
            autoComplete="off"
            name="state"
            value={user.state || ""}
            onChange={handleChange}
          />
        </div>

        {/* Address */}
        <div className="inputBox relative border-2 rounded-lg border-[#b0b0b1] w-full">
          <PiAddressBookThin className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#636380]" />
          <textarea
            id="address"
            placeholder="Address"
            className="w-full pl-12 pr-4 py-2 rounded-lg focus:outline-none text-[#636380]"
            autoComplete="off"
            name="address"
            value={user.address || ""}
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="inputBox relative border-2 rounded-lg border-[#b0b0b1] w-full md:w-[45%]">
          <CiUser className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#636380]" />
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="w-full pl-12 pr-4 py-2 rounded-lg focus:outline-none text-[#636380] outline-none"
            autoComplete="off"
            name="password"
            value={user.password || ""}
            onChange={handleChange}
          />
        </div>

        {/* Confirm Password */}
        <div className="inputBox relative border-2 rounded-lg border-[#b0b0b1] w-full md:w-[45%]">
          <CiUser className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#636380]" />
          <input
            type="password"
            id="cpassword"
            placeholder="Confirm Password"
            className="w-full pl-12 pr-4 py-2 rounded-lg focus:outline-none text-[#636380] outline-none"
            autoComplete="off"
            name="confirmPassword"
            value={user.confirmPassword || ""}
            onChange={handleChange}
          />
        </div>

        {/* Update Button */}
        <div className="w-full flex justify-center mt-6">
          <button
            onClick={updateUser}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none transition-colors duration-200"
          >
            Update User
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
