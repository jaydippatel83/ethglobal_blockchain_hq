import Image from 'next/image';
import React from 'react';
 
const cardData = [
    {
        id: 1,
        title: "Gigs & Work",
        imageSrc: "/assets/gig-economy.png",
        altText: "gig-economy",
        bgColor: "bg-yellowCustom"
    },
    {
        id: 2,
        title: "Q & A",
        imageSrc: "/assets/question.png",
        altText: "q&a",
        bgColor: "bg-greenCustom"
    },
    {
        id: 3,
        title: "Builders Point",
        imageSrc: "/assets/teamwork.png",
        altText: "Teamwork",
        bgColor: "bg-pinkCustom"
    }
];

const LandingCards = () => {
    return (
        <div className="grid grid-cols-3 gap-4 mx-auto justify-items-center">
            {cardData.map(card => ( // Mapping over the card data
                <div key={card.id} className={`flex flex-col items-center ${card.bgColor} border border-gray-300 rounded-lg shadow-lg p-8 w-80`}>
                    {/* Icon or Image */}
                    <Image
                        width={300}
                        height={300}
                        src={card.imageSrc}
                        alt={card.altText}
                        className="h-24 w-24 object-contain"
                    />
                    <button className="mt-4 font-bold text-lg bg-white border border-black px-6 py-2 rounded-full shadow-md hover:bg-gray-100">
                        {card.title}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default LandingCards;