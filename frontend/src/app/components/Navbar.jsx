"use client"
import React from 'react';
import Link from 'next/link';  // Import Link from Next.js
import { useSelector } from 'react-redux';

const Navbar = () => {
  // Access the user data from the Redux store
  const userAuth = useSelector(state => state.user);  // Fix to access 'user' instead of 'auth.user'
  console.log(userAuth.name, "userAuth");
  console.log(userAuth.email, "userAuth 2");

  
  const navbarList = userAuth.name && userAuth.email  // Check if the user has a name and email (logged in)
    ? [  // If user is authenticated, show "Profile"
        {
          id: 1,
          name: "Home",
          href: "/"
        },
        {
          id: 2,
          name: "Details",
          href: "/details"
        },
        {
          id: 3,
          name: "Profile",  // Show "Profile" if authenticated
          href: "/profile"
        }
      ]
    : [  // If user is not authenticated, show "Login" and "Register"
        {
          id: 1,
          name: "Home",
          href: "/"
        },
        {
          id: 2,
          name: "Details",
          href: "/details"
        },
        {
          id: 3,
          name: "Login",  // Show "Login"
          href: "/login"
        },
        {
          id: 4,
          name: "Register",  // Show "Register"
          href: "/register"
        }
      ];

  return (
    <div className="px-16 py-4 flex justify-between items-center shadow-lg ">
      <h1 className="text-[1.3rem] uppercase cursor-pointer">Curd</h1>
      <ul className="px-8 py-2 flex justify-between items-center gap-14">
        {navbarList.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}  // Use href for Next.js links
              className="border-b-2 border-transparent hover:border-blue-500 transition-colors duration-300 uppercase cursor-pointer"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
