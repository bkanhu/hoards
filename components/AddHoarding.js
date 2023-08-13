import { Globe, Globe2, Globe2Icon, GlobeIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
const categoriesData = [
  {
    id: 1,
    name: 'Read Later Articles',
    subcategories: [
      'Breaking news',
      'Politics',
      'World events',
      'Business and Finance',
      'Entertainment',
      'News and Current Events',
    ],
  },
  {
    id: 2,
    name: 'Entertainment',
    subcategories: ['Movies', 'TV shows', 'Music', 'Celebrities', 'Comedy'],
  },
  {
    id: 3,
    name: 'Lifestyle',
    subcategories: [
      'Fashion',
      'Health and wellness',
      'Travel',
      'Food and cooking',
      'Home and decor',
    ],
  },
  {
    id: 4,
    name: 'Hobbies and Interests',
    subcategories: [
      'Art and design',
      'Photography',
      'Sports',
      'Gaming',
      'DIY and crafts',
    ],
  },
  {
    id: 5,
    name: 'Education and Self-Improvement',
    subcategories: [
      'Online courses',
      'Educational resources',
      'How-to guides',
      'Self-improvement',
    ],
  },
  {
    id: 6,
    name: 'Science, Technology & Programming',
    subcategories: [
      'Gadgets and electronics',
      'Software and apps',
      'Tech news',
      'Science',
      'Environment',
      'Programming and development',
    ],
  },
  {
    id: 7,
    name: 'Business and Finance',
    subcategories: ['Entrepreneurship', 'Investing', 'Personal finance'],
  },
  {
    id: 8,
    name: 'Inspiration and Motivation',
    subcategories: ['Quotes', 'Success stories', 'Motivational content'],
  },
  {
    id: 9,
    name: 'Travel and Adventure',
    subcategories: [
      'Travel destinations',
      'Adventure activities',
      'Travel tips',
    ],
  },
  {
    id: 10,
    name: 'Miscellaneous ',
    subcategories: ['Others', 'Watch Later', 'Uncategorized'],
  },
];

import {
  collection,
  addDoc,
  getDoc,
  where,
  query,
  deleteDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { db } from '@/config/firebase';

const AddHoarding = ({ closeModal, updateUserData }) => {
  const { authUser } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [urlOrLink, setUrlOrLink] = useState('');
  const [note, setNote] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'hoards'), {
        owner: authUser.uid,
        category: selectedCategory,
        subcategory: selectedSubcategory,
        url: urlOrLink,
        note: note,
      });

      setSelectedCategory('');
      setSelectedSubcategory('');
      setUrlOrLink('');
      setNote('');

      const cachedUserData = JSON.parse(localStorage.getItem('userData'));
      if (cachedUserData) {
        const newData = [
          ...cachedUserData,
          {
            id: docRef.id,
            category: selectedCategory,
            subcategory: selectedSubcategory,
            url: urlOrLink,
            note: note,
          },
        ];
        localStorage.setItem('userData', JSON.stringify(newData));
        // Call the updateUserData function from props to update the userData state in Dashboard
        updateUserData(newData);
      }

      alert('Document written with ID: ' + docRef.id);
      closeModal();
    } catch (error) {
      console.log(error);
      alert('Error adding document: ' + error);
    }
  };
  return (
    <>
      <form
        action=""
        className="flex flex-col gap-4"
        onSubmit={handleFormSubmit}
      >
        <div>
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select a Category:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
          >
            <option value="">Select a category</option>
            {categoriesData.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          {selectedCategory && (
            <div>
              <label
                htmlFor="subcategory"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select a Subcategory:
              </label>
              <select
                id="subcategory"
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Select a subcategory</option>
                {categoriesData
                  .find((category) => category.name === selectedCategory)
                  ?.subcategories.map((subcategory) => (
                    <option key={subcategory} value={subcategory}>
                      {subcategory}
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor="url"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Link
          </label>

          <div className="flex mt-2">
            <span className="inline-flex items-center justify-center px-3 py-2 text-gray-600 border border-r-0 rounded-tl-lg rounded-bl-lg">
              https://
            </span>
            <input
              type="text"
              id="url"
              className="w-full px-2 py-2 border shadow-sm border-l-1 ring-inset rounded-tr-lg rounded-br-lg bg-gray-50 border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5  "
              placeholder="hello"
              value={urlOrLink}
              onChange={(e) => setUrlOrLink(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="note"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Add Note
          </label>
          <textarea
            id="note"
            rows="4"
            className="w-full px-2 py-2 border shadow-sm border-l-1 ring-inset rounded-lg bg-gray-50 border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5  max-h-44"
            placeholder="Add note... (totally optional though)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-2 py-1 text-base font-medium text-white bg-[#49b1ff] border border-gray-200 rounded-md hover:bg-[#12e6fc] transition duration-300"
        >
          Add
        </button>
      </form>
    </>
  );
};

export default AddHoarding;
