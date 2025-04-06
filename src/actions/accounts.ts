"use server";

import { connectDatabase } from "@/lib/database";
import Account from "@/models/Account";

export async function viewAccounts() {
    // TODO: validate the access token
    await connectDatabase();

    // Fetch all accounts from the database
    const accounts = await Account.find({}).sort({ createdAt: -1 });
    return accounts;
}

export async function setAdmin(id: string) {
    // TODO: validate the access token  
    await connectDatabase();

    // Update the account to be an admin
    const account = await Account.findByIdAndUpdate(id, { type: "admin" }, { new: true });
    if (!account) {
        throw new Error("Account not found");
    }
    return account;
}

export async function removeAdmin(id: string) {
    // TODO: validate the access token
    await connectDatabase();

    // Update the account to be a user
    const account = await Account.findByIdAndUpdate(id, { type: "user" }, { new: true });
    if (!account) {
        throw new Error("Account not found");
    }
    return account;
}

export async function deleteAccount(email: string) {
    // TODO: validate the access token
    await connectDatabase();

    // Delete the account from the database
    const account = await Account.findOneAndDelete({ email });
    if (!account) {
        throw new Error("Account not found");
    }
    return account;
}

export async function createAccount(email: string, password: string) {
    // TODO: validate the access token
    await connectDatabase();

    const account = await Account.create({
        email,
        password,
    });
    if (!account) {
        throw new Error("Account not created");
    }
    return account;
}

export async function checkExisting(email: string) {
    // TODO: validate the access token
    await connectDatabase();

    // Check if the account already exists
    const account = await Account.findOne({ email });
    return account;
}

export async function checkPassword(email: string, password: string) {
    // TODO: validate the access token
    await connectDatabase();

    const account = await Account.findOne({ email, password });
    return account;
}