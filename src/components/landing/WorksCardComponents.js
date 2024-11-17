import Image from 'next/image';
import React from 'react';

const WorksCardComponents = () => {
    const items = [
        {
            id: 1,
            logo: "/assets/solidity-dev.png", // Replace with actual logo path
            title: "Solidity Smart Contract Developer for DeFi Application",
            company: "DeFi Corp",
            badge: "Bounty",
            due: "Due in 3d",
            comments: 5,
            reward: "2,000",
            currency: "ETH",
        },
        {
            id: 2,
            logo: "/assets/rust-audit.png", // Replace with actual logo path
            title: "Rust Contract Audit",
            company: "Audit Co",
            badge: "Audit",
            due: "Due in 2d",
            comments: 8,
            reward: "1,500",
            currency: "USDC",
        },
        {
            id: 3,
            logo: "/assets/ui-ux-designer.png", // Replace with actual logo path
            title: "UI/UX Designer for Payment Protocol DApp",
            company: "Design Studio",
            badge: "Project",
            due: "Due in 5d",
            comments: 12,
            reward: "3,000",
            currency: "DAI",
        },
        {
            id: 4,
            logo: "/assets/technical-writer.png", // Replace with actual logo path
            title: "Technical Writer for Developer Docs",
            company: "Tech Writers Inc.",
            badge: "Bounty",
            due: "Due in 4d",
            comments: 2,
            reward: "1,000",
            currency: "USDC",
        },
        {
            id: 5,
            logo: "/assets/video-creator.png", // Replace with actual logo path
            title: "Educational Video Content Creator",
            company: "EduMedia",
            badge: "Project",
            due: "Due in 7d",
            comments: 3,
            reward: "1,200",
            currency: "ETH",
        },
    ];
    return (
        <div className="flex justify-center items-center ">
            <div className="w-[1100px]  border border-gray-300 rounded-custom p-6  shadow-lg">
                {/* Header Section */}
                <h1 className="mb-2 
                 bg-yellowCustom text-black 
                font-bold p-2 
                rounded-lg 
                shadow-[0px_4px_0px_rgba(0,0,0,1)] 
                border border-black w-full sm:w-[200px] mx-auto
                ">Gigs & Works</h1>

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

export default WorksCardComponents;