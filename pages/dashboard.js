import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import Loader from '@/components/Loader';
import { Plus } from 'lucide-react';
import Header from '@/components/Header';
import Modal from '@/components/Modal';
import AddHoarding from '@/components/AddHoarding';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '@/config/firebase';

const Dashboard = () => {
  const { authUser, isLoading } = useAuth();
  const router = useRouter();
  const [hoardings, setHoardings] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchUserHoards = async (uid) => {
    try {
      const q = query(collection(db, 'hoards'), where('owner', '==', uid));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHoardings(data);
      return data;
    } catch (error) {
      console.log('Error fetching hoardings:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push('/login');
    }
  }, [authUser, isLoading, router]);

  useEffect(() => {
    if (authUser) {
      const cachedUserData = localStorage.getItem('userData');
      if (cachedUserData) {
        console.log('loading from Cached user data:');
        setUserData(JSON.parse(cachedUserData));
      } else {
        console.log('loading from firestore user data:');
        fetchUserHoards(authUser.uid)
          .then((data) => {
            localStorage.setItem('userData', JSON.stringify(data));
            setUserData(data);
          })
          .catch((error) => {
            console.log('Error fetching hoardings:', error);
          });
      }
    }
  }, [authUser]);

  const updateUserData = (newData) => {
    setUserData(newData);
  };

  const Categories = ['all', ...new Set(userData.map((item) => item.category))];
  const handleFilter = (cat) => {
    setFilter(cat);
  };
  // const filteredUserData = filter
  //   ? userData.filter((hoarding) => hoarding.category === filter)
  //   : userData;

  const filteredUserData =
    filter === 'all'
      ? userData
      : userData.filter((hoarding) => hoarding.category === filter);

  if (isLoading) return <Loader />;

  return (
    <>
      {authUser && <Header />}
      <section className="flex flex-wrap w-auto gap-2 mx-20 my-4">
        {Categories.map((cat, index) => (
          <button
            key={cat}
            className="inline-flex items-center h-auto px-4 py-2 mx-0 text-xs font-medium text-gray-600 rounded-md w-fulls bg-gray-50 ring-1 ring-inset ring-gray-500/10"
            onClick={() => handleFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </section>
      <section className="my-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredUserData.length ? (
              filteredUserData.map((hoarding) => (
                <div
                  key={hoarding.id}
                  className="p-4 bg-white rounded-lg shadow-lg"
                >
                  <h2 className="text-lg font-semibold">{hoarding.note}</h2>
                  <p className="text-sm text-gray-500">{hoarding.location}</p>
                  <p className="text-sm text-gray-500">{hoarding.owner}</p>
                  <p className="text-sm text-gray-500">{hoarding.category}</p>
                </div>
              ))
            ) : (
              <p>No hoardings available.</p>
            )}
          </div>
        </div>
      </section>
      <div>
        <button
          onClick={openModal}
          className="fixed right-12 bottom-12 bg-[#49b1ff] p-4 rounded-full text-white hover:bg-[#12e6fc] transition duration-300"
        >
          <Plus />
        </button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div>
            <AddHoarding
              closeModal={closeModal}
              updateUserData={updateUserData}
            />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Dashboard;
