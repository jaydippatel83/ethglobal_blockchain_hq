"use client";
import React, { useEffect, useState } from 'react';
import useSWR from 'swr'; 
import AskQuestionForm from './QuestionForm';
import MyQuestionList from './MyQuestions';
import QuestionList from './QuestionList'; 
import { useAccount } from 'wagmi';

const fetcher = (url) => fetch(url).then((res) => res.json());

const QuestionsHomePage = ({ initialQuestions, initialPage }) => {
    const [currentView, setCurrentView] = useState('all');
    const { isConnected, address } = useAccount();
    const [page, setPage] = useState(initialPage || 1);

    const handleAskQuestionClick = () => setCurrentView('form');
    const handleMyQuestionClick = () => setCurrentView('my');
    const handleAllQuestionClick = () => setCurrentView('all');

    // const { data: questions, mutate } = useSWR(`/api/questions?page=${page}`, fetcher, {
    //     fallbackData: initialQuestions || [],
    //     refreshInterval: 30000,
    // }); 

    return (
        <div className="section-padding">
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold  md:text-xl lg:text-2xl xl:text-3xl">All Questions</h1>
                    <div className="flex space-x-2">
                        <button
                            onClick={handleAllQuestionClick}
                            className={`font-bold text-sm sm:text-sm  px-2 sm:px-2 py-1 sm:py-2 min-w-[80px] sm:min-w-[100px] text-center rounded-md ${currentView === 'all' ? 'bg-gray-600 text-white' : 'bg-gray-200 text-black'
                                }`}
                        >
                            All Questions
                        </button>
                        
                        {isConnected && (
                            <button
                                onClick={handleMyQuestionClick}
                                className={`font-bold text-sm sm:text-sm   px-2 sm:px-2 py-1 sm:py-2 min-w-[80px] sm:min-w-[100px] text-center rounded-md ${currentView === 'my' ? 'bg-gray-600 text-white' : 'bg-gray-200 text-black'
                                    }`}
                            >
                                My Questions
                            </button>
                        )}
                        <button
                            onClick={handleAskQuestionClick}
                            className={`font-bold text-sm sm:text-sm   px-2 sm:px-2 py-1 sm:py-2 min-w-[80px] sm:min-w-[100px] text-center rounded-md ${currentView === 'form' ? 'bg-gray-600 text-white' : 'bg-gray-200 text-black'
                                }`}
                        >
                            Ask Question
                        </button>
                    </div>
                </div>
                
                <div>
                    {currentView === 'form' ? (
                        <AskQuestionForm  />
                    ) : currentView === 'my' ? (
                        <MyQuestionList  />
                    ) : (
                        <QuestionList 
                            questions={initialQuestions} 
                            pageInfo={page}  
                        /> 
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuestionsHomePage;