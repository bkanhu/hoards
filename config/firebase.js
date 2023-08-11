import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyBTkRRH3yy8EWQx3YNXY_n3TQkq6vndkIg',
  authDomain: 'hui-link.firebaseapp.com',
  projectId: 'hui-link',
  storageBucket: 'hui-link.appspot.com',
  messagingSenderId: '658325534338',
  appId: '1:658325534338:web:cbb2998fff1642bdaca69b',
  measurementId: 'G-WMR0GFWSW6',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
