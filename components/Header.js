import React from 'react';
import { useAuth } from '@/context/AuthContext';
const Header = () => {
  const { authUser } = useAuth();
  // console.log(authUser);
  return (
    <header className="py-10 text-center bg-lime-50">
      <h1 className="text-2xl font-medium leading-10 text-gray-700">
        Hello {authUser.fullName}
      </h1>
      <p className="text-lg text-gray-600">What are you hoarding today?</p>
    </header>
  );
};

export default Header;
