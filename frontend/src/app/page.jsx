"use client";
import React, { useEffect, useState } from "react";
import { backendurlForUserDetails } from "./helpers/backend";
import { IoEyeSharp } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Link from "next/link";

const Page = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${backendurlForUserDetails}`);
        const data = await response.json();
        console.log(data, "data");

        if (data.status === true) {
          setUsers(data.users); // Assuming `data.users` is an array of user objects
        } else {
          alert("Failed to fetch users");
        }
      } catch (error) {
        console.log(error, "Error");
        alert("Something Went Wrong");
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[80vh] p-4">
      <table className="w-full max-w-4xl shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-[#09c294] text-white">
          <tr>
            <th className="py-4 px-6 text-left">Sr no</th>
            <th className="py-4 px-6 text-left">Name</th>
            <th className="py-4 px-6 text-left">Email</th>
            <th className="py-4 px-6 text-left">Phone</th>
            <th className="py-4 px-6 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user._id} className="border-b border-gray-200 ">
                <td className="py-4 px-6 text-left">{index + 1}</td>
                <td className="py-4 px-6 text-left">{user.username}</td>
                <td className="py-4 px-6 text-left">{user.email}</td>
                <td className="py-4 px-6 text-left">{user.phone}</td>

                <td className="py-4 px-6 text-center">
                  <div className="flex justify-center items-center gap-4">
                    <Link href={`/view/${user._id}`} >
                      <button
                        title="View"
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                      >
                        <IoEyeSharp size={20} />
                      </button>
                    </Link>
                    <Link href={`/edit/${user._id}`} passHref>
                      <button
                        title="Edit"
                        className="text-yellow-500 hover:text-yellow-700 transition-colors"
                      >
                        <FiEdit size={20} />
                      </button>
                    </Link>
                    <Link href={`/delete/${user.id}`} passHref>
                      <button
                        title="Delete"
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <MdDelete size={20} />
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-4 px-6 text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
