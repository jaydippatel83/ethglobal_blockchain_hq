import React, { useState, useEffect } from 'react'; 
import useSWR from 'swr';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { softDeleteQuestion } from '@/lib/questions';
import { getUserData } from '@/lib/profile';
   
import { useAccount } from 'wagmi';
import NoDataFound from '../NoDataFound';
import AuthorInfo from '../profile/ProfileInfo';
import SkeletonQue from '../SkeletonQue';

const fetcher = (url, token) => 
  fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.json());

const MyQuestionList = () => { 
    const {address} = useAccount()
  const [currentPage, setCurrentPage] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);

  const { data, error, mutate, isLoading } = useSWR(
     address ? ['/api/questions', currentPage,  address] : null,
    async ([url, page, address]) => { 
      const userData = await getUserData(address);
      const fullUrl = `${url}?authorId=${userData._id}&page=${page}`;
      return fetcher(fullUrl, token);
    },
    {
      revalidateOnFocus: false,
      refreshInterval: 30000,
    }
  );

  useEffect(() => {
    if (data?.questions && data.pageInfo) {
      if (currentPage === 1) {
        setQuestions(data.questions);
      } else {
        setQuestions((prevQuestions) => [...prevQuestions, ...data.questions]);
      }
      setPageInfo(data.pageInfo);
    }
  }, [data, currentPage]);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this?");
    if (isConfirmed) {
      try {
        const accessToken = await getAccessToken();
        await softDeleteQuestion(id, accessToken);
        setQuestions((prevQuestions) => prevQuestions.filter(question => question._id !== id));
        mutate();
        toast.success("Question has been deleted!");
      } catch (error) {
        toast.error("Error: " + error.message);
      }
    }
  };

  const loadMoreQuestions = () => {
    if (currentPage < pageInfo?.totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const renderTags = (tags) => (
    <div className="mb-2">
      {tags.map((tag) => (
        <span key={tag} className="text-xs bg-gray-200 rounded-full px-2 py-1 mr-2">
          {tag}
        </span>
      ))}
    </div>
  );

  if (isLoading) return <SkeletonQue />;
  if (error) return <div>Error loading questions</div>;
  if (!questions || questions.length === 0) return <NoDataFound label="Questions" />;

  return (
    <div className="justify-between">
      {questions.map((question) => (
        <div key={question.id} className="border p-4 rounded-lg shadow-sm mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">
              <Link href={`/question/${question._id}/${question.slug}`}>{question.title}</Link>
            </h3>
            <div className="flex space-x-2">
              <Link href={`/question/edit/${question._id}`}>
                <button className="text-blue-500">Edit</button>
              </Link>
              <button onClick={() => handleDelete(question._id)} className="text-red-500">
                Delete
              </button>
            </div>
          </div>
          {renderTags(question.tags)}
          <div className="flex justify-between items-center text-gray-500 text-sm">
            <div className="flex items-center">
              <span><span className='text-black'>{question.answersCount}</span> Answers</span>
            </div>
          </div>
          <AuthorInfo authorId={question.authorId} createdAt={question.createdAt} />
        </div>
      ))}
      {pageInfo && currentPage < pageInfo.totalPages && (
        <div className="flex justify-center mt-4">
          <button
            onClick={loadMoreQuestions}
            className="mt-4 font-bold text-base sm:text-lg bg-gradient-to-r text-white px-4 sm:px-6 py-1 sm:py-2 from-ct-blue-dark to-ct-blue-light min-w-[80px] sm:min-w-[100px] text-center rounded-md"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default MyQuestionList;