import React from 'react';

const QuestionsCards = () => {
    return (
        <div className="flex justify-center items-center ">
        <div className="w-[1080px]  border border-gray-300 rounded-custom p-6 shadow-lg">
          {/* Header Section */}
          <h1 className="mb-2 text-3xl hover:underline cursor-pointer">Gigs & Works</h1>  
          
  
          {/* Balance Card */}
          <div className="bg-white border border-gray-300 rounded-custom p-6 flex justify-between items-center mb-6">
            <div>
              <p className="text-lg">Card balance</p>
              <h2 className="text-2xl font-bold">$4,023.20</h2>
            </div>
            <button className="bg-greenCustom text-black px-4 py-2 rounded-md shadow hover:opacity-90">
              Top up
            </button>
          </div> 
          
        </div>
      </div>
    );
};

export default QuestionsCards;