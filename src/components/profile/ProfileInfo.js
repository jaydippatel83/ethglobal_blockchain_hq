'use client'
import React, { useEffect, useState } from 'react'; 
import Link from 'next/link'; 
import Image from 'next/image';
import { getUserData } from '@/lib/profile'; 
import { generateAvatar } from '@/lib/generateAvatar';
import { calculateTimeDifference } from '@/lib/questions';

const AuthorInfo =({ author}) => {  
    const [userData, setUserData]= useState();
     
    useEffect(() => {
        const getData = async () => {
            const user = await getUserData(author);
            setUserData(user);
        };
        getData();
    }, [author]);
      

    const avatar = generateAvatar(author);
    const formatWalletAddress = (address) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
      }; 
    
    return (
        <div className="flex items-center">
            {userData ? (
                <>
                    <Link href={`/dashboard/profile/${userData.id}`} className="block">
                        <Image width={100} height={100} src={avatar || ''} alt={userData.username || ''} className="w-8 h-8 rounded-lg" />
                    </Link>
                    <div className="flex flex-wrap items-center justify-between flex-1 ml-2">
                        <Link href={`/dashboard/profile/${userData.id}`} className="text-ct-blue-dark hover:text-ct-blue-light">
                            {userData.username || formatWalletAddress(userData.wallet)}
                        </Link>
                        <small className="text-right">
                            <span className="text-sm text-gray-500">Asked</span>
                            <span className="block text-sm">{calculateTimeDifference(userData.createdAt)}</span>
                        </small>
                    </div>
                </>
            ) : (
                <span>Loading...</span>
            )}
        </div>
    );
};

export default AuthorInfo;
