'use client';
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import erc20ABI from '../utils/erc20ABI.json';

const WBTC_ADDRESS = '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599'; // Ethereum WBTC contract address

export default function WBTCBalance() {
  const [balance, setBalance] = useState(null);
  const [symbol, setSymbol] = useState('');

  useEffect(() => {
    const fetchBalance = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const contract = new ethers.Contract(WBTC_ADDRESS, erc20ABI, provider);
        const rawBalance = await contract.balanceOf(address);
        const decimals = await contract.decimals();
        const tokenSymbol = await contract.symbol();
        const formatted = ethers.formatUnits(rawBalance, decimals);
        setBalance(formatted);
        setSymbol(tokenSymbol);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div style={{ marginTop: '20px', fontSize: '1.2rem' }}>
      <strong>WBTC Balance:</strong> {balance ? `${balance} ${symbol}` : 'Loading...'}
    </div>
  );
}