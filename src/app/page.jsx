'use client';
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import tokenData from '../components/tokenList.json';

export default function Home() {
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const [address] = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
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
      <img
        src="dragon-logo.png"
        alt="Dragon Flash Logo"
        style={{ width: '120px', marginBottom: '20px' }}
      />
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

      {/* Token Display (Only Name & Symbol with spacing) */}
      <div style={{ marginTop: '50px' }}>
        <h2>Available Tokens</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
          {tokenData.map((token, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#f0f0f0',
                padding: '12px 20px',
                borderRadius: '10px',
                width: '270px',
                boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                fontSize: '15px',
                fontWeight: '500'
              }}
            >
              <span>{token.name}</span> — <span>{token.symbol}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
