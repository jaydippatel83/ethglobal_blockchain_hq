import Capsule, { Environment } from "@usecapsule/react-sdk";
import {  Bebas_Neue } from 'next/font/google';

export const capsule = new Capsule(Environment.BETA, process.env.NEXT_PUBLIC_APP_CAPSULE_API_KEY);

export const bebas = Bebas_Neue({
    variable: '--bebas',
    weight: ['400'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
})
 

 
