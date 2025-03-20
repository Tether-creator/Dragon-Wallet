// /app/layout.js
export const metadata = {
  title: 'Dragon Flash Wallet',
  description: 'Your Web3 Gateway',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
