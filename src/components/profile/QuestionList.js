import Link from 'next/link';
import React from 'react'; 
import { calculateTimeDifference } from '@/lib/questions';
import NoDataFound from '../NoDataFound';

const QuestionList = ({ questions, hasMore, loadMore }) => { 
    return (
        <div>
            {questions.length > 0 ? (
                questions.map(q => (
                    <div key={q._id} className="mb-4 p-4 border-b last:border-b-0">

                        <h3 className="text-lg font-semibold hover:text-ct-blue-dark">
                            <Link href={`/question/${q.id}/${q.slug}`}>
                                {q.title}
                            </Link>
                        </h3>
                        <div className='flex justify-between'>
                       <div>
                       <p className="text-sm text-gray-500">Views: <span className='text-black'>{q.views}</span></p>
                        <p className="text-sm text-gray-500">Answers: <span className='text-black'>{q.answersCount}</span></p>
                        <div className="mb-2">
                            {q?.tags?.map((tag) => (
                                <span key={tag} className="text-xs bg-gray-200 rounded-full px-2 py-1 mr-2">{tag}</span>
                            ))}
                        </div>  
                        </div> 
                        <small className="text-right">
                            <span className="text-sm text-gray-500 block">Asked</span>
                            <span className="block text-sm">{calculateTimeDifference(q.createdAt)}</span>
                        </small>
                        </div>
                    </div>
                ))
            ) : (
                <NoDataFound label="Questions" />
            )}
            {hasMore && questions.length < 0 && (
                <button
                    onClick={loadMore}
                    className="bg-gradient-to-r from-ct-blue-dark to-ct-blue-light text-white px-4 py-2 rounded-lg"
                >
                    Load More
                </button>
            )}
        </div>
    );
};

export default QuestionList;
