import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import Loader from '@/components/Loader';
import { LogOut } from 'lucide-react';
import Header from '@/components/Header';

const Dashboard = () => {
  const { authUser, isLoading, logOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push('/login');
    }
  }, [authUser, isLoading, router]);

  if (isLoading) return <Loader />;
  return (
    <div className="bg-lime-50">
      {authUser && <Header />}
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

export default Dashboard;
