import { generateAvatar } from "@/lib/generateAvatar"; 
import React from "react";
import AuthorInfo from "../profile/ProfileInfo";
import Link from "next/link";

const QuestionsCardComponents = () => {
  const questions = [
    {
      id: 1,
      profile: generateAvatar("/assets/user1.png"), // Replace with actual profile image path
      question: "How do I integrate smart contracts with React?",
      tags: ["js", "smart contracts"],
      answers: 3,
      user: "0x6949...042B",
      asked: "1 day ago",
    },
    {
      id: 2,
      profile: generateAvatar("/assets/user2.png"),
      question: "What is the best way to learn Web3 development?",
      tags: ["web3", "learning"],
      answers: 5,
      user: "0x1234...ABCD",
      asked: "2 days ago",
    },
    {
      id: 3,
      profile: generateAvatar("/assets/user3.png"),
      question: "How do you deploy a Next.js app to Vercel?",
      tags: ["nextjs", "deployment"],
      answers: 2,
      user: "0xABCD...1234",
      asked: "3 days ago",
    },
    {
      id: 4,
      profile: generateAvatar("/assets/user4.png"),
      question: "What are the benefits of using IPFS?",
      tags: ["ipfs", "decentralization"],
      answers: 1,
      user: "0x5678...9XYZ",
      asked: "4 days ago",
    },
    {
      id: 5,
      profile: generateAvatar("/assets/user5.png"),
      question: "How do I get started with Solidity?",
      tags: ["solidity", "blockchain"],
      answers: 0,
      user: "0x9XYZ...5678",
      asked: "5 days ago",
    },
  ];

  const renderTags = (tags) => (
    <div className="mb-2 text-left">
      {tags.map((tag) => (
        <span key={tag} className="text-xs bg-gray-200 rounded-full px-2 py-1 mr-2">
          {tag}
        </span>
      ))}
    </div>
  );

  return (
    <div className="flex justify-center items-center">
      <div className="w-[1100px] border border-gray-300 rounded-lg p-6 shadow-lg">
        {/* Header */}
        <h1 className="mb-4 
                 bg-greenCustom text-black 
                font-bold p-2 
                rounded-lg 
                shadow-[0px_4px_0px_rgba(0,0,0,1)] 
                border border-black w-full sm:w-[200px] mx-auto
                ">Q & A</h1>

        {/* Questions List */}
        <div className="space-y-4">
          {questions.map((item) => (
             <div key={item.id} className="border p-4 rounded-lg shadow-sm mb-4 bg-white">
             <div className="flex justify-between items-center mb-2">
               <h3 className="text-lg font-semibold">
                 <Link href={`/question/${item.id}/${item.question}`}>{item.question}</Link>
               </h3> 
             </div>
             {renderTags(item.tags)}
             <div className="flex justify-between items-center text-gray-500 text-sm">
               <div className="flex items-center"> 
                 <span><span className='text-black'>{item.answers}</span> Answers</span>
               </div>
             </div>
             <AuthorInfo author={item}   />
           </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionsCardComponents;
