import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
const Navbar = () => {
  const { authUser, logOut } = useAuth();
  return (
    <>
      <nav className="flex justify-between items-center px-[80px] py-2 shadow-sm">
        <div>
          <Link href="/" alt="home" className="flex items-center gap-2">
            <Image src="/logoo.png" alt="logo" height={35} width={35} />
            <span className="text-lg font-medium">Hoards</span>
          </Link>
        </div>
        {authUser ? (
          <button
            onClick={() => logOut()}
            className=" flex items-center gap-2 text-base font-medium  bg-[#49b1ff] py-1 px-4 rounded-full text-white hover:bg-[#12e6fc] transition duration-300"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            alt="login"
            className=" flex items-center gap-2 text-base font-medium  bg-[#49b1ff] py-1 px-4 rounded-full text-white hover:bg-[#12e6fc] transition duration-300"
          >
            Login
          </Link>
        )}
      </nav>
    </>
  );
};

export default Navbar;
