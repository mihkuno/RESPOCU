"use server";
import { connectDatabase } from "@/lib/database";
import Research from "@/models/Research";
import { revalidatePath } from "next/cache";

export async function addBookmark(id: string, email: string) {
    // TODO: validate the access token for this action

    await connectDatabase();

    await Research.findByIdAndUpdate(
        id,
        {
            $addToSet: { bookmarked_by: email },
        },
        { new: true }
    );

    revalidatePath("/");
}

export async function removeBookmark(id: string, email: string) {
    // TODO: validate the access token for this action
    
    await connectDatabase();

    await Research.findByIdAndUpdate(
        id,
        {
            $pull: { bookmarked_by: email },
        },
        { new: true }
    );

    revalidatePath("/");
}

export async function storeArchive(id: string) {
    
    // TODO: validate the access token for this action
    await connectDatabase();

    await Research.findByIdAndUpdate(
        id,
        { is_archived: true },
        { new: true }
    );

    revalidatePath("/");
}


export async function restoreArchive(id: string) {
    
    // TODO: validate the access token for this action
    await connectDatabase();

    await Research.findByIdAndUpdate(
        id,
        { is_archived: false },
        { new: true }
    );

    revalidatePath("/");
}

export async function markBestPaper(id: string) {

    // TODO: validate the access token for this action
    await connectDatabase();

    await Research.findByIdAndUpdate(
        id,
        { is_best: true },
        { new: true }
    );

    revalidatePath("/");
}

export async function unmarkBestPaper(id: string) {

    // TODO: validate the access token for this action
    await connectDatabase();

    await Research.findByIdAndUpdate(
        id,
        { is_best: false },
        { new: true }
    );

    revalidatePath("/");
}

export async function deleteStudy(id: string) {

    // TODO: validate the access token for this action
    await connectDatabase();

    await Research.findByIdAndDelete(id);

    revalidatePath("/");
}