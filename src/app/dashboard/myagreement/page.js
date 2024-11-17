
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import MyAgreements from '@/components/MyAgreement';
import React from 'react';

const page = () => {
    return (
        <DashboardLayout>
            <h1>My Agreements</h1>
            <MyAgreements />
        </DashboardLayout>
    );
};

export default page;