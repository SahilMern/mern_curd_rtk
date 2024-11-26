"use client";
import { backendurlForSingleUser } from "@/app/helpers/backend";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [user, setUser] = useState(null);
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
          setUser(null);
        }
      } catch (error) {
        console.log(error);
        setUser(null);
      }
    };

    if (!id) {
      console.error("Invalid or undefined ID");
      setUser(null);
      router.push("/error");
    } else {
      fetchSingleUserDetails();
    }
  }, [id, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-xl p-6 space-y-6">
        {/* Image section */}
        <div className="flex justify-center">
          <img
            src={user?.image || '/default-avatar.png'}  // Fallback to a default avatar if no image is available
            alt="User Avatar"
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-300"
          />
        </div>

        <h1 className="text-2xl font-semibold text-center text-gray-800">
          User Details
        </h1>
        
        {user ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-medium text-gray-700">Name:</p>
              <p className="text-gray-900">{user.name}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium text-gray-700">Email:</p>
              <p className="text-gray-900">{user.email}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium text-gray-700">Phone:</p>
              <p className="text-gray-900">{user.phone}</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center space-x-2">
            <div className="animate-spin w-6 h-6 border-4 border-t-transparent border-gray-600 rounded-full"></div>
            <p>Loading user data...</p>
          </div>
        )}

        {!id && (
          <div className="text-center text-red-500">
            <p>Error: Invalid or undefined ID</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
