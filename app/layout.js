export const metadata = {
  title: 'Dragon Flash Wallet',
  description: 'Connect and view token balances',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif' }}>{children}</body>
    </html>
  );
}