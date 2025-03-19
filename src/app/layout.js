// /app/layout.js
export const metadata = {
  title: 'Dragon Flash Wallet',
  description: 'Web3 wallet with token support and WBTC price feed',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
