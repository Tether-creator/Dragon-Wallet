// /components/WBTCBalance.jsx

'use client';

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// WBTC Contract on BSC
const WBTC_ADDRESS = '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c'; // WBTC on BSC
const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)"
];

export default function WBTCBalance({ walletAddress }) {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!walletAddress) return;

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(WBTC_ADDRESS, ERC20_ABI, await provider);
        const decimals = await contract.decimals();
        const rawBalance = await contract.balanceOf(walletAddress);
        const formatted = ethers.formatUnits(rawBalance, decimals);
        setBalance(formatted);
      } catch (err) {
        console.error('Failed to fetch WBTC balance:', err);
      }
    };

    fetchBalance();
  }, [walletAddress]);

  return (
    <div style={{ marginTop: '20px', fontSize: '18px' }}>
      {walletAddress ? (
        balance !== null ? (
          <p>WBTC Balance: {balance}</p>
        ) : (
          <p>Loading WBTC balance...</p>
        )
      ) : (
        <p>Connect your wallet to see WBTC balance.</p>
      )}
    </div>
  );
}
