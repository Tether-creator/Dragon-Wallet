
'use client';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import erc20ABI from '../utils/erc20ABI.json';

const WBTC_ADDRESS = '0x25C233589BF8497B6281be83fEd127933D82A9d5'; // BSC WBTC

export default function WBTCBalance({ provider, address }) {
  const [balance, setBalance] = useState(null);
  const [symbol, setSymbol] = useState('');

  useEffect(() => {
    const fetchBalance = async () => {
      if (!provider || !address) return;
      const contract = new ethers.Contract(WBTC_ADDRESS, erc20ABI, provider);
      const rawBalance = await contract.balanceOf(address);
      const tokenSymbol = await contract.symbol();
      setBalance(ethers.utils.formatUnits(rawBalance, 18));
      setSymbol(tokenSymbol);
    };
    fetchBalance();
  }, [provider, address]);

  return (
    <div style={{ marginTop: '20px', fontSize: '1.2rem' }}>
      <strong>WBTC Balance:</strong> {balance ? `${balance} ${symbol}' : 'Loading...'}
    </div>
  );
}
