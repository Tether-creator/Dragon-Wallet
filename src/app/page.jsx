'use client'
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export default function Home() {
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const [address] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(address);
        setIsConnected(true);
      } catch (err) {
        console.error(err);
      }
    } else {
      alert('MetaMask not detected');
    }
  };

  const getBalance = async (address) => {
    if (!address) return;
    const provider = new ethers.BrowserProvider(window.ethereum);
    const balance = await provider.getBalance(address);
    setBalance(ethers.formatEther(balance));
  };

  useEffect(() => {
    if (walletAddress) {
      getBalance(walletAddress);
    }
  }, [walletAddress]);

  return (
    <main style={{ textAlign: 'center', marginTop: '80px' }}>
      <img src="/dragon-logo.png" alt="Dragon Flash Logo" style={{ width: '120px', marginBottom: '20px' }} />
      <h1>Dragon Flash Wallet</h1>
      <button
        onClick={connectWallet}
        style={{
          padding: '12px 25px',
          fontSize: '16px',
          marginTop: '20px',
          cursor: 'pointer',
          backgroundColor: '#ff9900',
          border: 'none',
          borderRadius: '6px',
          color: '#fff'
        }}
      >
        {isConnected ? 'Wallet Connected' : 'Connect Wallet'}
      </button>
      {isConnected && (
        <div style={{ marginTop: '30px' }}>
          <p>Wallet: {walletAddress}</p>
          <p>ETH Balance: {balance}</p>
        </div>
      )}
    </main>
  );
}
