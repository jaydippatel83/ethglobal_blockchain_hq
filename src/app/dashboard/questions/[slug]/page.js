import DashboardLayout from '@/components/dashboard/DashboardLayout';
import React from 'react';

const page = ({params:{id, slug}}) => {
    return (
        <DashboardLayout>
            Question details
        </DashboardLayout>
    );
};

export default page;