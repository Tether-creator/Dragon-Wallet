// /app/page.jsx
'use client';

import Image from 'next/image';
import styles from './page.module.css';
import ConnectWallet from '../components/ConnectWallet';
import WBTCBalance from '../components/WBTCBalance';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.logoContainer}>
        <Image
          src="/dragon-logo.png"
          alt="Dragon Flash Logo"
          width={120}
          height={120}
          priority
        />
      </div>
      <h1 className={styles.title}>Dragon Flash Wallet</h1>
      <ConnectWallet />
      <WBTCBalance />
    </main>
  );
}
