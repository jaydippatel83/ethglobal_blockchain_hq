import DashboardLayout from '@/components/dashboard/DashboardLayout';
import QuestionsHomePage from '@/components/questions/QuestionHomePage';
import { fetchAllQuestions } from '@/lib/questions';
import React from 'react';

const page = async() => {
    const  {pageInfo, questions} = await fetchAllQuestions();  
    return (
        <DashboardLayout>
           <QuestionsHomePage initialQuestions={questions} initialPage={pageInfo}/>
        </DashboardLayout>
    );
};

export default page;