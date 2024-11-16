'use client';
import React from 'react'; 
import Link from 'next/link'; 
import Image from 'next/image';

const AuthorInfo = ({ author}) => {  
    return (
        <div className="flex items-center">
            <Link href={`/profile/${author.id}`} className="block">
                <Image width={100} height={100} src={author?.profile || ''} alt={author?.user} className="w-8 h-8 rounded-lg" />
            </Link>
            <div className="flex flex-wrap items-center justify-between flex-1 ml-2">
                <Link href={`/profile/${author.user}`} className="text-ct-blue-dark hover:text-ct-blue-light">{author?.user}</Link>
                <small className="text-right">
                    <span className="text-sm text-gray-500">asked</span>
                    <span className="block text-sm"> 1 day ago</span>
                </small>
            </div>
        </div>
    );
};

export default AuthorInfo;
