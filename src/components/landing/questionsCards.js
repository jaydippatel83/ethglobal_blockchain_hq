import Image from 'next/image';
import React from 'react';

const QuestionsCards = () => {
    const items = [
        {
            id: 1,
            logo: "/assets/gig-economy.png", // Replace with actual logo path
            title: "Catoff on Blinks: Create Mini-Game or Gaming API Dev Bounty",
            company: "Catoff",
            badge: "Bounty",
            due: "Due in 1d",
            comments: 10,
            reward: "1,000",
            currency: "USDC",
        },
        {
            id: 2,
            logo: "/assets/question.png", // Replace with actual logo path
            title: "Write a Twitter thread on how to play: Skiddy Samo",
            company: "Octo Gaming",
            badge: "Bounty",
            due: "Due in 1d",
            comments: 23,
            reward: "4,000",
            currency: "OTK",
        },
        {
            id: 3,
            logo: "/assets/teamwork.png", // Replace with actual logo path
            title: "Graphic designer for Wifi Dabba",
            company: "Wifi Dabba",
            badge: "Project",
            due: "Due in 1d",
            comments: 4,
            reward: "700-1.25k",
            currency: "USDC",
        },
    ];
    return (
        <div className="flex justify-center items-center ">
            <div className="w-[1080px]  border border-gray-300 rounded-custom p-6 shadow-lg">
                {/* Header Section */}
                <h1 className="mb-2 text-3xl hover:underline cursor-pointer">Gigs & Works</h1>

                <div className="p-4 space-y-6">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex text-left gap-4 bg-white shadow-md border border-gray-200 rounded-lg p-4"
                        >
                            <div className="flex-shrink-0">
                                <Image
                                    src={item.logo}
                                    alt={item.company}
                                    width={50}
                                    height={50}
                                    className="rounded-md"
                                />
                            </div>

                            {/* Details */}
                            <div className="flex-grow">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {item.company}
                                    <span className="ml-2 px-2 py-1 text-xs font-medium text-blue-500 bg-blue-100 rounded-full">
                                        {item.badge}
                                    </span>
                                </p>
                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                    <p>{item.due}</p>
                                    <span className="mx-2">|</span>
                                    <p className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M18 8a6 6 0 11-12 0 6 6 0 0112 0zM7 8a5 5 0 1010 0A5 5 0 007 8z" />
                                            <path d="M8.293 10.707a1 1 0 010-1.414L9.586 8l-1.293-1.293a1 1 0 111.414-1.414L11 6.586l1.293-1.293a1 1 0 011.414 1.414L12.414 8l1.293 1.293a1 1 0 01-1.414 1.414L11 9.414l-1.293 1.293a1 1 0 01-1.414 0z" />
                                        </svg>
                                        {item.comments}
                                    </p>
                                    <span className="mx-2">|</span>
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                </div>
                            </div>

                            {/* Reward */}
                            <div className="flex-shrink-0 text-right">
                                <p className="text-lg font-semibold text-blue-600">
                                    {item.reward}
                                </p>
                                <p className="text-sm text-gray-500">{item.currency}</p>
                            </div>
                        </div>
                    ))}
                </div> 
            </div>
        </div>
    );
};

export default QuestionsCards;