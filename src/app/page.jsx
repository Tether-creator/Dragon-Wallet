'use client';
import { useState } from 'react';
import ConnectWallet from '../components/ConnectWallet';
import WBTCBalance from '../components/WBTCBalance';
import '../styles/globals.css';

export default function Home() {
  const [wallet, setWallet] = useState(null);

  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Dragon Flash Wallet</h1>
      <ConnectWallet onConnect={setWallet} />
      {wallet && <WBTCBalance wallet={wallet} />}
    </main>
  );
}
