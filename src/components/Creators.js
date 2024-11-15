import React from 'react';

const Creators = () => {
    const creators = [
        {
          name: "icebergy_",
          rate: "$12.40 per minute",
          description: "Dev, Angel Investor focused on ai, crypto, nfts, and bitcoin created @CryptoWhaleBot",
          image: "/path-to-image1.png",
        },
        {
          name: "OxBreadguy",
          rate: "$6.43 per minute",
          description: "Builder of things. Nuanced convo maxi. Fulltime web3.",
          image: "/path-to-image2.png",
        },
        {
          name: "OxKawz",
          rate: "$25.85 per minute",
          description: "building @timedotfun",
          image: "/path-to-image3.png",
        },
        {
          name: "ColdBloodShill",
          rate: "$5.07 per minute",
          description: "@WaddlePenguRune @TheHavenCrypto @BlockBetGG Growth...",
          image: "/path-to-image4.png",
        },
        {
          name: "VentureCoinist",
          rate: "$5.24 per minute",
          description: "trading internet coins + host @StacksPodcast",
          image: "/path-to-image5.png",
        },
        {
          name: "OxMert_",
          rate: "$43.36 per minute",
          description: "shitpost propulsion engineer @heliuslabs, ex coinbase — Solana's best RPCs, APIs...",
          image: "/path-to-image6.png",
        },
      ];
    return ( 
      <main className="max-w-5xl mx-auto mt-10 p-6">
        <h2 className="text-4xl font-bold mb-4">Featured Creators</h2>  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {creators.map((creator, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-4">
              <img
                src={creator.image}
                alt={creator.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold">{creator.name}</h3>
              <p className="text-lg text-gray-600">{creator.rate}</p>
              <p className="text-gray-700 mt-2">{creator.description}</p>
            </div>
          ))}
        </div>
      </main> 
    );
};

export default Creators;