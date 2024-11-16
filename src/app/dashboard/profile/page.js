import DashboardLayout from '@/components/dashboard/DashboardLayout';
import UserProfile from '@/components/profile/UserProfile';
import React from 'react';

const page = () => {
    return (
        <DashboardLayout>
          <UserProfile /> 
        </DashboardLayout>
    );
};

export default page;


 