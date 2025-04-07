

import React from 'react';
import Home from './page';
import { viewStudies } from '@/actions/study';
import { headers } from 'next/headers';

export default async function HomeLayout() {

    const headersList = await headers();
    const email = headersList.get('email') as string;
    const type = headersList.get('type') as string;

    console.log(type);  

    const response = await viewStudies(email);
    return <Home studyData={response} />;
}