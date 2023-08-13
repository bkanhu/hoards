import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import Loader from '@/components/Loader';
import { LogOut } from 'lucide-react';
import Header from '@/components/Header';
import Modal from '@/components/Modal';
import AddHoarding from '@/components/AddHoarding';
import { Plus } from 'lucide-react';

const Dashboard = () => {
  const [hoardInput, setHoardInput] = useState('');
  const [hoardList, setHoardList] = useState([]);

  const { authUser, isLoading, logOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push('/login');
    }
  }, [authUser, isLoading, router]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
      <div>
        <button
          onClick={openModal}
          className="absolute right-12 bottom-12 bg-[#49b1ff] p-4 rounded-full text-white hover:bg-[#12e6fc] transition duration-300"
        >
          <Plus />
        </button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div>
            <AddHoarding />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
