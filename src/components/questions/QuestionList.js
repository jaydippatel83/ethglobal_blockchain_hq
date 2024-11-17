import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';  
import NoDataFound from '../NoDataFound';
import AuthorInfo from '../profile/ProfileInfo';
import SkeletonQue from '../SkeletonQue';
import { getUserData } from '@/lib/profile';

const QuestionList = ({ questions, pageInfo }) => {
    const [data, setData] = useState(questions || []);
    const [currentPage, setCurrentPage] = useState(pageInfo?.currentPage);
    const [loading, setLoading] = useState(false);
    const [pageInfoState, setPageInfoState] = useState(pageInfo);  

    useEffect(() => {
        setData(questions);
        setCurrentPage(pageInfo);
        setPageInfoState(pageInfo);
    }, [questions, pageInfo]);

    const fetchData = async () => {
        if (loading || !pageInfoState) return;
        setLoading(true);
        try {
            const newPage = currentPage + 1;
            const res = await fetch(`/api/questions?page=${newPage}`);
            const newData = await res.json(); 
            setData((prevData) => [...prevData, ...newData.questions]);
            setPageInfoState(newData.pageInfo);
            setCurrentPage(newPage);
        } catch (error) {
            console.error("Error fetching questions:", error);
        } finally {
            setLoading(false);
        }
    };

    const renderQuestions = useMemo(() => {
        if (data?.length === 0) {
            return <NoDataFound label="Questions" />;
        }
        return data?.map(async (question) => {
            const { id, slug, title, authorId, tags } = question;  

            return (
                <div key={id} className="border p-4 rounded-lg bg-white shadow-sm mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold">
                            <Link href={`/question/${id}/${slug}`}>
                                {title}
                            </Link>
                        </h3>
                    </div>
                    <div className="mb-2">
                        {tags?.map((tag) => (
                            <span key={tag} className="text-xs bg-gray-200 rounded-full px-2 py-1 mr-2">{tag}</span>
                        ))}
                    </div>
                    <div className="flex justify-between items-center text-gray-500 text-sm">
                        <div className="flex items-center">
                            <span><span className='text-black'>{10}</span> Answers</span>
                        </div>
                    </div>
                    <AuthorInfo author={authorId} />
                </div>
            );
        });
    }, [data]);

    const PaginationControls = () => (
        <div className="flex justify-center mt-4">
            {pageInfoState !== currentPage && (
                <button
                    onClick={() => fetchData()}
                    disabled={loading}
                    className="mt-4 font-bold text-base sm:text-lg bg-gradient-to-r text-white px-4 sm:px-6 py-1 sm:py-2 from-ct-blue-dark to-ct-blue-light min-w-[80px] sm:min-w-[100px] text-center rounded-md"
                >
                    {loading ? <div className="circular-progress"></div> : "Load More"}
                </button>
            )}
        </div>
    );

    if (!data) return <SkeletonQue />;

    return (
        <div className='justify-between'>
            {renderQuestions}
            {data.length !== 0 &&  <PaginationControls />}
        </div>
    );
};

export default QuestionList;
