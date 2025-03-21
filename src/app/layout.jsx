'use client'
import { useEffect, useState } from 'react';

export default function TokenList() {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    fetch('/data/tokenList.json')
      .then((res) => res.json())
      .then((data) => setTokens(data));
  }, []);

  return (
    <div>
      <h2>Available Tokens</h2>
      <ul>
        {tokens.map((token, index) => (
          <li key={index}>
            <strong>{token.name}</strong> ({token.symbol})<br />
            Contract: {token.address}
          </li>
        ))}
      </ul>
    </div>
  );
}
