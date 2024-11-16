import React from 'react';

const SkeletonQue = () => {
    return (
        <div>
             {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="border p-4 rounded-lg shadow-md mb-4 bg-gray-100 animate-pulse">
                <div className="flex justify-between items-center mb-2">
                    <div className="h-5 w-3/4 bg-gray-300 rounded"></div>  
                </div>
                <div className="flex space-x-2 mb-2">
                    <div className="h-5 w-12 bg-gray-300 rounded"></div>  
                    <div className="h-5 w-12 bg-gray-300 rounded"></div>  
                </div>
                <div className="h-4 w-16 bg-gray-300 rounded mb-4"></div> 
                <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>  
                    <div className="ml-2 flex flex-col">
                        <div className="h-4 w-24 bg-gray-300 rounded mb-1"></div>  
                        <div className="h-4 w-16 bg-gray-300 rounded"></div> 
                    </div>
                </div>
            </div>
            ))}
        </div>
       
    );
};

export default SkeletonQue;