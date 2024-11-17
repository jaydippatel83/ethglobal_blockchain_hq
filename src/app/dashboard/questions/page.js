import DashboardLayout from '@/components/dashboard/DashboardLayout';
import QuestionsHomePage from '@/components/questions/QuestionHomePage';
import { fetchAllQuestions } from '@/lib/questions';
import React from 'react';

const page = async() => {
    const {   questions } = await fetchAllQuestions();  

    // Convert Firestore timestamps to plain objects or strings
    const formattedQuestions = questions.map(question => ({
        id: question.id,
        slug: question?.slug,
        authorName: question?.authorName,
        details: question?.details,
        tags: question?.tags,
        createdAt: question?.createdAt.seconds ? new Date(question?.createdAt.seconds * 1000).toISOString() : null, // Convert to ISO string
        title: question?.title,
        authorId: question?.authorId
    }));

    return (
        <DashboardLayout>
           <QuestionsHomePage initialQuestions={formattedQuestions} initialPage={1}/>
        </DashboardLayout>
    );
};

export default page;