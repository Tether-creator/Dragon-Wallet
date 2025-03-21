'use client';
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export default function Home() {
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [tokenData, setTokenData] = useState([]);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const [address] = await window.ethereum.request({
          method: 'eth_requestAccounts',
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
    fetch('/data/tokenList.json')
      .then((res) => res.json())
      .then((data) => setTokenData(data))
      .catch((err) => console.error('Error loading token list:', err));
  }, []);

  useEffect(() => {
    if (walletAddress) {
      getBalance(walletAddress);
    }
  }, [walletAddress]);

  const handleBuy = (symbol) => {
    alert(`Buy ${symbol} clicked!`);
  };

  return (
    <main style={{ textAlign: 'center', marginTop: '80px' }}>
      <img
        src="/dragon-logo.png"
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
          color: '#fff',
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

      <div style={{ marginTop: '50px' }}>
        <h2>Available Tokens</h2>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'center',
          }}
        >
          {tokenData.map((token, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#f0f0f0',
                padding: '12px 20px',
                borderRadius: '10px',
                width: '320px',
                boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                fontSize: '15px',
                fontWeight: '500',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>
                {token.name} — {token.symbol}
              </span>
              <button
                onClick={() => handleBuy(token.symbol)}
                style={{
                  padding: '6px 12px',
                  fontSize: '14px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Buy
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
