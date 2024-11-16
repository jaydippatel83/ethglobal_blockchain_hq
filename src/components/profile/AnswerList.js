import Link from 'next/link';
import React from 'react';
import NoDataFound from '../NoDataFound';
import { calculateTimeDifference } from '@/lib/questions';

const AnswerList = ({ answers, hasMore, loadMore }) => {
    return (
        <div>
            {answers?.length > 0 ? (
                answers?.map(a => (
                    <div key={a._id} className="mb-4 p-4 border-b last:border-b-0">
                        <h3 className="text-lg font-semibold hover:text-ct-blue-dark">
                            <Link href={`/question/${a._id}/${a.slug}`}>
                                {a.title}
                            </Link>
                        </h3>
                        <div className='flex justify-between'>
                            <div>
                            <div className="mb-2">
                            {a?.tags?.map((tag) => (
                                <span key={tag} className="text-xs bg-gray-200 rounded-full px-2 py-1 mr-2">{tag}</span>
                            ))}
                        </div>  
                            </div>
                            <small className="text-right">
                                <span className="text-sm text-gray-500 block">Answered</span>
                                <span className="block text-sm">{calculateTimeDifference(a.updatedAt)}</span>
                            </small>
                        </div>
                    </div>
                ))
            ) : (
                <NoDataFound label="Answers" />
            )}
            {hasMore && answers?.length < 0 && (
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

export default AnswerList;
