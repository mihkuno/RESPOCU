

import React from 'react';
import Home from './page';
import { connectDatabase } from "@/lib/database";
import Research from "@/models/Research";


export default async function HomeLayout() {
 
    // TODO: get the email from the headers
    const email = "caindayjoeninyo@gmail.com";

    await connectDatabase();
    
    // get the studies that are not archived
    let studies = await Research.find({ is_archived: false }).select("-file");
    if (studies) {
        studies = studies.map((study) => ({
            id: study._id.toString(),
            title: study.title,
            description: study.description,
            categories: study.categories,
            type: study.research_type,
            authors: study.authors,
            publishedBy: study.publisher,
            publishedDate: study.created_at,
            isBestPaper: study.is_best,
            isArchived: study.is_archived,
            isBookmarked: study.bookmarked_by.includes(email),
        }));
    }

    return <Home studyData={studies} />;
}