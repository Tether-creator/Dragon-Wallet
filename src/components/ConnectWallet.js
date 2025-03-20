'use client';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export default function ConnectWallet({ onConnect }) {
  const [walletAddress, setWalletAddress] = useState('');

  async function connect() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        onConnect(accounts[0]);
      } catch (err) {
        console.error(err);
      }
    } else {
      alert('MetaMask not detected');
    }
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <button onClick={connect}>Connect Wallet</button>
    </div>
  );
}
