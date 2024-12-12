'use client';

import { useState } from 'react';
import * as constants from '@/constants/constants';
import { useTheme } from 'next-themes';

const features = [
  {
    title: 'Fractional Ownership',
    description: 'Invest in high-value properties with smaller capital, opening up real estate to more individuals.',
  },
  {
    title: 'Property NFTs',
    description: 'Properties are represented as NFTs on the BNB Smart Chain, ensuring secure and transparent ownership.',
  },
  {
    title: 'Automated Rental Income',
    description: 'Smart contracts automatically distribute rental income to investors based on their ownership share.',
  },
  {
    title: 'Transparency & Security',
    description: 'All transactions and ownership details are recorded on the blockchain for unparalleled transparency.',
  },
];

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [walletOverlay, setWalletOverlay] = useState(false);
  // const redirectUri = process.env.NODE_ENV === 'production' ? constants.PROD_URL : constants.DEV_URL;

  let redirectUri;
if (process.env.NODE_ENV === 'production') {
  redirectUri = constants.PROD_URL;
} else if (process.env.NODE_ENV === 'development') {
  redirectUri = constants.DEV_URL;
}  else {
  console.warn(`Unexpected NODE_ENV: ${process.env.NODE_ENV}. Defaulting to DEV_URL`);
  redirectUri = constants.DEV_URL;
}


  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-300 dark:from-gray-900 dark:to-gray-800 flex flex-col text-gray-800 dark:text-gray-200">
      {/* Header */}
      <header className="py-4 px-8 flex items-center justify-between backdrop-blur-md bg-white/30 dark:bg-gray-800/30">
        <h1 className="text-2xl font-bold">BNBPropertyLink</h1>
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-md">
          {theme === 'dark' ? '☀️' : '🌙'} 
        </button>
      </header>

      {/* Hero Section */}
      <section className="flex-grow flex items-center justify-center px-8 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Revolutionizing Real Estate Investment</h2>
          <p className="text-lg mb-8">
            BNBPropertyLink is a decentralized platform built on the BNB Smart Chain, enabling fractional ownership 
            of properties and making real estate investment accessible to everyone.
          </p>
          <div className="flex space-x-4 justify-center">
            <a href={`https://github.com/login/oauth/authorize?client_id=${constants.CLIENT_ID}`} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg">
              Sign in with Github
            </a>
            <button 
              onClick={() => setWalletOverlay(true)} 
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg"
            >
              Sign in with Wallet
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white dark:bg-gray-900 py-16 px-8 backdrop-blur-md bg-white/30 dark:bg-gray-800/30">
        <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="bg-yellow-100 dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 px-8 text-center bg-gray-200 dark:bg-gray-800">
        <p>&copy; {new Date().getFullYear()} BNBPropertyLink. All rights reserved.</p>
      </footer>

      {/* Wallet Overlay */}
      {walletOverlay && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Connect Wallet</h2>
            <div className="flex flex-col space-y-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg">
                Metamask
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg">
                Trust Wallet
              </button>
              <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg">
                Coinbase Wallet
              </button>
            </div>
            <button 
              onClick={() => setWalletOverlay(false)} 
              className="mt-6 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
