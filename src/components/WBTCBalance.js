'use client';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from '../utils/erc20ABI.json';

const WBTC_ADDRESS = '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c'; // WBTC on BSC

export default function WBTCBalance({ wallet }) {
  const [balance, setBalance] = useState(null);
  const [symbol, setSymbol] = useState('');

  useEffect(() => {
    if (!wallet) return;
    const provider = new ethers.BrowserProvider(window.ethereum);
    async function fetchBalance() {
      const contract = new ethers.Contract(WBTC_ADDRESS, abi, await provider);
      const bal = await contract.balanceOf(wallet);
      const sym = await contract.symbol();
      const decimals = await contract.decimals();
      setBalance(ethers.formatUnits(bal, decimals));
      setSymbol(sym);
    }
    fetchBalance();
  }, [wallet]);

  return (
    <div style={{ marginTop: '20px', fontSize: '1.2rem', textAlign: 'center' }}>
      <strong>WBTC Balance:</strong> {balance ? `${balance} ${symbol}` : 'Loading...'}
    </div>
  );
}
