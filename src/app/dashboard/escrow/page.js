import AgreementApp from '@/components/AgreementApp';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import React from 'react';

const page = () => {
    return (
        <DashboardLayout>
            <AgreementApp />
        </DashboardLayout>
    );
};

export default page;