

import React from 'react';
import Home from './page';
import { viewStudies } from '@/actions/study';


export default async function HomeLayout() {
 
    // TODO: get the email from the headers
    const email = "caindayjoeninyo@gmail.com";
    const response = await viewStudies(email);
    return <Home studyData={response} />;
}