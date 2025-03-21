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

  return (
    <main style={{ textAlign: 'center', marginTop: '80px' }}>
      <style>{
        .token-box {
          background-color: #f0f0f0;
          padding: 12px 20px;
          border-radius: 10px;
          width: 320px;
          box-shadow: 0 3px 6px rgba(0,0,0,0.1);
          font-size: 15px;
          font-weight: 500;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background-color 0.2s ease;
        }

        .token-box:hover {
          background-color: #e2e2e2;
        }

        .buy-button {
          padding: 6px 12px;
          font-size: 14px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .buy-button:hover {
          background-color: #0056b3;
        }
      }</style>

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
            <div className="token-box" key={index}>
              <span>{token.name} — {token.symbol}</span>
              <button
                className="buy-button"
                onClick={() => alert(Buy ${token.symbol})}
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
