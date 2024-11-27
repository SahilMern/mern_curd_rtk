"use client";
import { MdOutlineEmail } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { useState } from "react";
import { backendurlForUserLogin } from "../helpers/backend"; // Adjust import path as needed
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading, signInFail } from "../redux/slices/userSlice";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user); // Get loading and error from Redux

  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
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

    dispatch(setLoading());  // Set loading state in Redux

    try {
      const response = await fetch(`${backendurlForUserLogin}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInput),
        credentials: 'include',
      });

      const data = await response.json();
      console.log(data, "response");

      if (response.ok && data.status === true) {
        dispatch(setUser(data.user)); // Set user data
        router.push("/"); 
      } else {
        dispatch(signInFail("Login failed. Please check your credentials.")); // Dispatch error
      }
    } catch (error) {
      console.log(error, "error");
      dispatch(signInFail("An error occurred. Please try again.")); // Dispatch error
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 py-10">
      <div className="w-[400px] p-8 flex flex-col justify-center items-center bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center text-[#333]">Login to Your Account</h2>

        {/* Error Message from Redux */}
        {error && (
          <div className="mb-4 text-center text-red-500">
            <p>{error}</p>
          </div>
        )}

        {/* Input Fields */}
        <form onSubmit={handleForm}>
          <div className="w-full flex flex-col gap-4">
            {/* Email */}
            <div className="inputBox mb-4 relative">
              <MdOutlineEmail className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#636380]" />
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="w-full pl-12 pr-4 py-2 rounded-lg focus:outline-none bg-[#f9f9f9] text-[#333] border border-[#ddd] shadow-sm focus:border-blue-500"
                autoComplete="off"
                value={userInput.email}
                name="email"
                onChange={handleInput}
                required
              />
            </div>

            {/* Password */}
            <div className="inputBox mb-4 relative">
              <CiUser className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#636380]" />
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-2 rounded-lg focus:outline-none bg-[#f9f9f9] text-[#333] border border-[#ddd] shadow-sm focus:border-blue-500"
                autoComplete="off"
                value={userInput.password}
                name="password"
                onChange={handleInput}
                required
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300 ease-in-out"
              disabled={loading}  // Disable button while loading
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account? 
            <a href="/register" className="text-blue-600 hover:underline"> Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
