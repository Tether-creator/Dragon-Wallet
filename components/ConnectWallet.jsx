// /components/ConnectWallet.jsx

'use client';

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export default function ConnectWallet({ onWalletConnected }) {
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        onWalletConnected(accounts[0]);
      } catch (err) {
        console.error('Connection error:', err);
      }
    } else {
      alert('MetaMask is not installed.');
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setWalletAddress(accounts[0]);
        onWalletConnected(accounts[0]);
      });
    }
  }, []);

  return (
    <div>
      <button onClick={connectWallet} style={{
        background: '#0070f3',
        color: '#fff',
        padding: '12px 24px',
        fontSize: '1rem',
        borderRadius: '5px',
        cursor: 'pointer',
        border: 'none',
        transition: '0.3s ease'
      }}
      onMouseOver={e => e.target.style.background = '#0051a3'}
      onMouseOut={e => e.target.style.background = '#0070f3'}>
        {walletAddress ? 'Wallet Connected' : 'Connect Wallet'}
      </button>
      {walletAddress && <p style={{ marginTop: '10px' }}>{walletAddress}</p>}
    </div>
  );
}
