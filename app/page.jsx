'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Home() {
  const [tokens, setTokens] = useState([])

  useEffect(() => {
    fetch('/data/tokenList.json')
      .then((res) => res.json())
      .then((data) => setTokens(data))
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-4">
      <div className="flex justify-center">
        <Image
          src="/dragon-logo.png"
          alt="Dragon Flash Logo"
          width={100}
          height={100}
        />
      </div>
      <h1 className="text-center text-3xl font-bold mb-8 mt-4">Dragon Flash Wallet</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tokens.map((token, index) => (
          <div
            key={index}
            className="bg-white/10 p-4 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition duration-300"
          >
            <h2 className="text-xl font-semibold">{token.name}</h2>
            <p className="text-sm text-gray-300">Symbol: {token.symbol}</p>
            <div className="mt-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 w-full">
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
