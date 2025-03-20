// app/layout.jsx
export const metadata = {
  title: 'Dragon Flash Wallet',
  description: 'A secure and elegant Web3 wallet',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
