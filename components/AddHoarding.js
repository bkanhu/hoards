import { Globe, Globe2, Globe2Icon, GlobeIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
const categoriesData = [
  {
    id: 1,
    name: 'News and Current Events',
    subcategories: [
      'Breaking news',
      'Politics',
      'Technology',
      'Science',
      'World events',
    ],
  },
  {
    id: 2,
    name: 'Entertainment',
    subcategories: ['Movies', 'TV shows', 'Music', 'Books', 'Celebrities'],
  },
  {
    id: 3,
    name: 'Lifestyle',
    subcategories: [
      'Fashion',
      'Food and cooking',
      'Health and wellness',
      'Travel',
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
    name: 'Education',
    subcategories: [
      'Online courses',
      'Educational resources',
      'How-to guides',
      'Self-improvement',
    ],
  },
  {
    id: 6,
    name: 'Technology',
    subcategories: [
      'Gadgets and electronics',
      'Software and apps',
      'Tech news',
      'Programming and development',
    ],
  },
  {
    id: 7,
    name: 'Business and Finance',
    subcategories: [
      'Entrepreneurship',
      'Investing',
      'Personal finance',
      'Business news',
    ],
  },
  {
    id: 8,
    name: 'Science and Nature',
    subcategories: ['Astronomy', 'Biology', 'Environment', 'Psychology'],
  },
  {
    id: 9,
    name: 'Social Media and Trends',
    subcategories: [
      'Memes',
      'Viral content',
      'Social media tips',
      'Internet culture',
    ],
  },
  {
    id: 10,
    name: 'Inspiration and Motivation',
    subcategories: ['Quotes', 'Success stories', 'Motivational content'],
  },
  {
    id: 11,
    name: 'Parenting and Family',
    subcategories: [
      'Parenting tips',
      'Family activities',
      'Childcare resources',
    ],
  },
  {
    id: 12,
    name: 'Personal Development',
    subcategories: [
      'Mindfulness',
      'Productivity',
      'Goal setting',
      'Life hacks',
    ],
  },
  {
    id: 13,
    name: 'Humor and Comedy',
    subcategories: ['Funny videos', 'Jokes', 'Comedy sketches'],
  },
  {
    id: 14,
    name: 'History and Culture',
    subcategories: ['Historical facts', 'Cultural insights', 'Heritage'],
  },
  {
    id: 15,
    name: 'Environment and Sustainability',
    subcategories: ['Eco-friendly tips', 'Sustainability news', 'Green living'],
  },
  {
    id: 16,
    name: 'Home Improvement',
    subcategories: ['Renovation ideas', 'Home organization', 'Interior design'],
  },
  {
    id: 17,
    name: 'Sports and Fitness',
    subcategories: ['Sports news', 'Workout routines', 'Fitness tips'],
  },
  {
    id: 18,
    name: 'Tech and Gadgets',
    subcategories: [
      'Latest technology trends',
      'Reviews of gadgets',
      'Tech how-to guides',
    ],
  },
  {
    id: 19,
    name: 'Travel and Adventure',
    subcategories: [
      'Travel destinations',
      'Adventure activities',
      'Travel tips',
    ],
  },
  {
    id: 20,
    name: 'Art and Design',
    subcategories: ['Art news', 'Design inspiration', 'Art history'],
  },
  {
    id: 21,
    name: 'Food and Cooking',
    subcategories: ['Recipes', 'Cooking tips', 'Food news'],
  },
  {
    id: 22,
    name: 'Photography',
    subcategories: ['Photography tips', 'Photography news', 'Photo editing'],
  },
  {
    id: 23,
    name: 'Music',
    subcategories: ['Music news', 'Music reviews', 'Music history'],
  },
  {
    id: 24,
    name: 'Books and Literature',
    subcategories: ['Book reviews', 'Book recommendations', 'Literature news'],
  },
  {
    id: 25,
    name: 'Celebrities and Pop Culture',
    subcategories: ['Celebrity news', 'Celebrity gossip', 'Pop culture news'],
  },
  {
    id: 26,
    name: 'Fashion and Style',
    subcategories: ['Fashion news', 'Fashion trends', 'Style tips'],
  },
  {
    id: 27,
    name: 'Beauty and Skincare',
    subcategories: ['Beauty tips', 'Skincare tips', 'Beauty product reviews'],
  },
  {
    id: 28,
    name: 'Health and Wellness',
    subcategories: [
      'Health news',
      'Wellness tips',
      'Mental health tips',
      'Fitness tips',
    ],
  },
  {
    id: 29,
    name: 'Politics',
    subcategories: [
      'Political news',
      'Political commentary',
      'Political humor',
    ],
  },
  {
    id: 30,
    name: 'Science',
    subcategories: ['Science news', 'Science facts', 'Science history'],
  },
  {
    id: 31,
    name: 'World Events',
    subcategories: ['World news', 'World history', 'World culture'],
  },
  {
    id: 32,
    name: 'Movies',
    subcategories: ['Movie reviews', 'Movie news', 'Movie history'],
  },
  {
    id: 33,
    name: 'TV Shows',
    subcategories: ['TV show reviews', 'TV show news', 'TV show history'],
  },
  {
    id: 34,
    name: 'Gaming',
    subcategories: ['Game reviews', 'Game news', 'Game history'],
  },
  {
    id: 35,
    name: 'DIY and Crafts',
    subcategories: ['DIY projects', 'Craft ideas', 'Craft tutorials'],
  },
  {
    id: 36,
    name: 'Other',
    subcategories: ['Others'],
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
