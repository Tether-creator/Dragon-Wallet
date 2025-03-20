
'use client';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import WBTCBalance from '../components/WBTCBalance';

export default function Home() {
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
      await ethProvider.send('eth_requestAccounts', []);
      const signer = ethProvider.getSigner();
      const addr = await signer.getAddress();
      setProvider(ethProvider);
      setAddress(addr);
    } else {
      alert('MetaMask not found');
    }
  };

  return (
    <main style={{ textAlign: 'center', padding: '50px' }}>
      <img src="/dragon-logo.png" alt="Logo" style={{ width: '100px', marginBottom: '20px' }} />
      <h1>Dragon Flash Wallet</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
      {provider && address && <WBTCBalance provider={provider} address={address} />}
    </main>
  );
}
