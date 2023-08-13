import Navbar from '@/components/Navbar';
import { AuthUserProvider } from '@/context/AuthContext';
import '@/styles/globals.css';
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <Navbar />
      <Component {...pageProps} />
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-N9TR5RTEN2" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-N9TR5RTEN2');
        `}
      </Script>
    </AuthUserProvider>
  );
}
