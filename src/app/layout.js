// app/layout.js
'use client';
import React from 'react';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Dragon Flash Wallet</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ margin: 0, padding: 0, fontFamily: 'sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
