export const metadata = {
  title: 'Dragon Flash Wallet',
  description: 'Web3 Wallet built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#000',
        color: '#fff',
        backgroundImage: 'url("/logo-faded.png")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}>
        {children}
      </body>
    </html>
  );
}
