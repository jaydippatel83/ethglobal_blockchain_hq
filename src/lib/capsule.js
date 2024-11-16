import Capsule, { Environment } from "@usecapsule/react-sdk";
import {  Bebas_Neue } from 'next/font/google';
import { generateAvatar } from "./generateAvatar";

export const capsule = new Capsule(Environment.BETA, process.env.NEXT_PUBLIC_APP_CAPSULE_API_KEY);

export const bebas = Bebas_Neue({
    variable: '--bebas',
    weight: ['400'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
})

export const generateUserData = (user) => {
    const avatar = generateAvatar(user); 

    const userData = {
        username: user,   
        wallet: user  || "",  
        email: user || null,  
        bio: "",  
        profilePicture: avatar || "",   
    };

    return userData;
};
 

 
