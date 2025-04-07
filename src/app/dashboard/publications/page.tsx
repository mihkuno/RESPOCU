
import React from "react";
import Publications from "./publications";
import Research from "@/models/Research";
import mongoose from "mongoose";
import { connectDatabase } from "@/lib/database";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export default async function PublicationsLayout({ searchParams }: {
    searchParams: Promise<{edit: string}>;
}) {
    
    await connectDatabase();  

    const headersList = await headers();
    const accountEmail = headersList.get('email') as string;
    const type = headersList.get('type') as string;

    const query = await searchParams;
    const { edit } = query;

    const handlePublishAction = async (formData: FormData) => {
        "use server";

        // TODO: validate the access token for this action

        const publisher =       accountEmail;
        const id =              formData.get("id");
        const title =           formData.get("title");
        const description =     formData.get("description");
        const research_type =   formData.get("research_type");
        const authors =         JSON.parse(formData.get("authors")    as string);
        const categories =      JSON.parse(formData.get("categories") as string);
        const file =            JSON.parse(formData.get("file")       as string);

        console.log(id, title, description, research_type, authors, categories, publisher, file);
         
        let response;
        if (!id) {
            response = await Research.create({
                title, description, categories, research_type, authors, publisher, file, created_at: Date.now(),
            });
        }
        else {
            response = await Research.findByIdAndUpdate(new mongoose.Types.ObjectId(id as string), {
                title, description, categories, research_type, authors, publisher, file, created_at: Date.now(),
            });
        }

        revalidatePath("/dashboard/publications");
        return response?._id.toString();
    };

    let publishedStudies;
    publishedStudies = await Research.find({ publisher: accountEmail });
    if (publishedStudies) {
        publishedStudies = publishedStudies.map((study) => ({
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
            isBookmarked: study.bookmarked_by.includes(accountEmail),
        }));
    }
    
    if (edit) {
        const response = await Research.findById(new mongoose.Types.ObjectId(edit as string));
        
        if (response) {
            const studyDataToEdit = {
                id: response._id.toString(),
                title: response.title,
                description: response.description,
                categories: response.categories,
                type: response.research_type,
                authors: response.authors,
                publishedBy: response.publisher,
                publishedDate: response.created_at,
                isBestPaper: response.is_best,
                isArchived: response.is_archived,
                isBookmarked: response.bookmarked_by.includes(accountEmail),
            };
    
            const studyFileToEdit = {
                name: response.file.name as string,
                size: response.file.size as number,
                type: response.file.type as string,
                data: response.file.data as Buffer,
                last_modified: response.file.last_modified as number,
            };
    
            return <Publications 
                studies={publishedStudies} 
                publishAction={handlePublishAction} 
                studyDataToEdit={studyDataToEdit}
                studyFileToEdit={studyFileToEdit}
            />;
        }
    }

    return <Publications studies={publishedStudies} publishAction={handlePublishAction}  />;
}