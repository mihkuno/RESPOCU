
import React from "react";
import Publications from "./publications";
import Research from "@/models/Research";
import mongoose from "mongoose";
import { connectDatabase } from "@/lib/database";

export default async function PublicationsLayout({ searchParams }: {
    searchParams: Promise<{edit: string}>;
}) {
    
    // TODO: get the email from the headers
    const accountEmail = "caindayjoeninyo@gmail.com"
    const query = await searchParams;
    const { edit } = query;


    const handlePublishAction = async (formData: FormData) => {
        "use server";

        const publisher =       accountEmail;
        const id =              formData.get("id");
        const title =           formData.get("title");
        const description =     formData.get("description");
        const research_type =   formData.get("research_type");
        const authors =         JSON.parse(formData.get("authors")    as string);
        const categories =      JSON.parse(formData.get("categories") as string);
        const file =            JSON.parse(formData.get("file")       as string);

        console.log(id, title, description, research_type, authors, categories, publisher, file);
         
        if (!id) {
            await connectDatabase();  
            Research.create({
                title, description, categories, research_type, authors, publisher, file, created_at: Date.now(),
            });
        }
        else {
            await connectDatabase();  
            Research.findByIdAndUpdate(new mongoose.Types.ObjectId(id as string), {
                title, description, categories, research_type, authors, publisher, file, created_at: Date.now(),
            });
        }
    };

    if (edit) {
        await connectDatabase();  
        const response = await Research.findById(new mongoose.Types.ObjectId(edit as string));
        
        if (response) {
            const studyDataToEdit = {
                id: response._id,
                title: response.title,
                description: response.description,
                categories: response.categories,
                type: response.research_type,
                authors: response.authors,
                publishedBy: response.publisher,
                publishedDate: response.created_at,
                isBestPaper: response.is_best,
                isArchived: response.is_archived.includes(accountEmail),
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
            publishAction={handlePublishAction} 
            publishedStudies={[]} 
            studyDataToEdit={studyDataToEdit}
            studyFileToEdit={studyFileToEdit}
            />;
        }
    }

    return <Publications publishAction={handlePublishAction} publishedStudies={[]} />;
}