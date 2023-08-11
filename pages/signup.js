import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';

export default function SignupPage() {
  const [fullName, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { authUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && authUser) {
      router.push('/dashboard');
    }
  }, [authUser, isLoading]);
  const singupHandler = async () => {
    if (!fullName || !email || !password) return;

    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: fullName });
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full min-h-screen ">
        <div className="logo">
          <Image src="/logo.png" alt="logo" width={100} height={100} />
        </div>
        <div className="text-center text-container">
          <h1 className="mb-4 text-3xl font-medium md:text-4xl">Sign Up</h1>
          <div className="mb-4 text-lg font-light">
            Welcome back! Please enter your details.
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="w-80">
          <div className="mb-3">
            <label htmlFor="name" className="block mb-1 font-light rounded-md">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              className="block w-full p-2 px-4 py-2 leading-6 text-black transition bg-transparent border border-gray-300 rounded-md shadow-sm form-control bg-clip-padding-box focus:outline-none focus:border-transparent focus:ring-2 focus:ring-indigo-500 "
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="block mb-1 font-light rounded-md">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="block w-full p-2 px-4 py-2 leading-6 text-black transition bg-transparent border border-gray-300 rounded-md shadow-sm form-control bg-clip-padding-box focus:outline-none focus:border-transparent focus:ring-2 focus:ring-indigo-500 "
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="password"
              className="block mb-1 font-light rounded-sm"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="block w-full p-2 px-4 py-2 leading-6 text-black transition bg-transparent border border-gray-300 rounded-md shadow-sm form-control bg-clip-padding-box focus:outline-none focus:border-transparent focus:ring-2 focus:ring-indigo-500 "
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3 ">
            <div>
              <input
                type="checkbox"
                name="remember"
                id="remember"
                className="mr-2"
              />
              <label htmlFor="remember" className="font-medium">
                Remember me
              </label>
            </div>
          </div>
          <div className="mb-3">
            <button
              type="submit"
              className="block w-full px-4 py-2 text-sm font-medium text-white transition-colors duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md btn btn-primary hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={singupHandler}
            >
              Sign Up
            </button>
            <p className="mt-3 text-center">
              {' '}
              Already have an account?
              <Link href="/login" className="ml-2 text-blue-500">
                Login
              </Link>{' '}
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
