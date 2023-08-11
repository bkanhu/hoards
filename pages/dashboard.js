import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../config/firebase';
import { useAuth } from '@/context/AuthContext';

import { LogOut } from 'lucide-react';

const dashboard = () => {
  const { authUser, isLoading, logOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push('/login');
    }
  }, [authUser, isLoading]);
  return (
    <div>
      Dashboard
      <button
        onClick={() => {
          logOut();
        }}
      >
        <LogOut />
      </button>
    </div>
  );
};

export default dashboard;
