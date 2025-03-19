'use client';
import React from 'react';
import WBTCBalance from '../components/WBTCBalance';
import WalletConnectButton from '../components/WalletConnectButton';

export default function Home() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 40 }}>
      <h1>Dragon Flash Wallet</h1>
      <WalletConnectButton />
      <WBTCBalance />
    </main>
  );
}