"use server";
import { decrypt } from "@/lib/encryption";
import { encrypt } from "@/lib/encryption";
import { checkExisting } from "@/actions/accounts";
import { checkPassword } from "@/actions/accounts";
import { createAccount } from "@/actions/accounts";
import { deleteAccount } from "@/actions/accounts";
import { connectDatabase } from "@/lib/database";
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import nodemailer from "nodemailer";


export async function createAccessToken(email: string, password: string) {
    const expires = Date.now() + 365 * 24 * 60 * 60 * 1000; // Token valid for 1 year
    const data = await encrypt(
        JSON.stringify({ email, password, expires }),
        process.env.ACCESS_SECRET
    );
    return data;
}

export async function createVerifyToken(email: string, password: string) {
    const expires = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes
    const data = await encrypt(
        JSON.stringify({ email, password, expires }),
        process.env.VERIFY_SECRET
    );
    return data;
}

export async function createForgotToken(email: string) {
    const expires = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes
    const data = await encrypt(
        JSON.stringify({ email, expires }),
        process.env.FORGOT_SECRET
    );
    return data;
}

export async function validateVerifyToken(token: string): 
Promise<{ status: 'expired' | 'valid' | 'invalid' | 'existing'; }> {

    try {
        const decryptedData = await decrypt(token, process.env.VERIFY_SECRET);
        const parsedData = JSON.parse(decryptedData);

        if (parsedData) {
            const { email, password, expires } = parsedData;

            if (Date.now() > expires) {
                console.log("Token expired");
                return { status: "expired" };
            }

            // Check if account is already existing
            await connectDatabase();
            const account = await checkExisting(email);
            if (account) {
                console.log("Account already exists");
                return { status: "existing" };
            }

            // Create the account
            console.log("Creating account");
            await createAccount(email, password);

            // Create an access token
            console.log("Creating access token");
            const token = await createAccessToken(email, password);

            // Set the token in cookies
            console.log("Setting token in cookies");
            const cookieStore = await cookies();
            cookieStore.set("token", token, { httpOnly: true });
            // Remove the email_to_verify cookie
            console.log("Deleting email_to_verify cookie");
            cookieStore.delete("email_to_verify");
            
            return { status: "valid" };
        }
    } 
    
    catch (error) {
        console.error("Error decrypting token:", error);
        return { status: "invalid" };
    }

    return { status: "invalid" };
}

export async function validateAccessToken(token: string):
Promise<{ status: 'expired' | 'valid' | 'invalid' | 'existing'; }> {

    try {
        const decryptedData = await decrypt(token, process.env.ACCESS_SECRET);
        const parsedData = JSON.parse(decryptedData);

        if (parsedData) {
            const { email, password, expires } = parsedData;

            if (Date.now() > expires) {
                return { status: "expired" };
            }

            // Check if the email and password are valid
            await connectDatabase();
            const account = await checkPassword(email, password);
            if (!account) {
                return { status: "invalid" };
            }

            return { status: "valid" };
        }
    } catch (error) {
        console.error("Error decrypting token:", error);
        return { status: "invalid" };
    }

    return { status: "invalid" };
}

export async function validateForgotToken(token: string): 
Promise<{ status: 'expired' | 'valid' | 'invalid' | 'existing'; }> {

    try {
        const decryptedData = await decrypt(token, process.env.FORGOT_SECRET);
        const parsedData = JSON.parse(decryptedData);

        if (parsedData) {
            const { email, expires } = parsedData;

            if (Date.now() > expires) {
                console.log("Token expired");
                return { status: "expired" };
            }

            // Check if account is already existing
            await connectDatabase();
            const account = await checkExisting(email);
            if (!account) {
                console.log("Account does not exist");
                return { status: "invalid" };
            }

            // Delete the account
            console.log("Deleting account");
            await deleteAccount(email);

            // Remove the email_to_verify cookie
            console.log("Deleting email_to_verify cookie");
            const cookieStore = await cookies();
            cookieStore.delete("email_to_verify");

            return { status: "valid" };
        }
    } 
    
    catch (error) {
        console.error("Error decrypting token:", error);
        return { status: "invalid" };
    }

    return { status: "invalid" };
}



export async function loginAction(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { error: "Email or password is missing" };
    }

    await connectDatabase();
    const account = await checkExisting(email);
    const cookieStore = await cookies();

    if (account) {
        if (account.password !== password) {
            return { error: "Incorrect password" };
        }
        const token = await createAccessToken(email, password);
        cookieStore.set("token", token, { httpOnly: true });
        redirect('/dashboard');
    } 
    return { error: "Account does not exist" };
}


export async function signupAction(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { error: "Email or password is missing" }
    }

    await connectDatabase();
    const account = await checkExisting(email);

    if (account) {
        return { error: "Account already exists" };
    }

    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const from = process.env.EMAIL_USER;
    const to = email;
    const subject = "EduChest - Email Verification";
    const url = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/verify?token=${await createVerifyToken(email, password)}`;
    const message = `Hello, please verify your email by clicking on the link below:\n\n ${url}`;
    await transporter.sendMail({ from, to, subject, text: message }) as nodemailer.SentMessageInfo;
    
    // Set allow verify route to be accessed
    const cookieStore = await cookies();
    cookieStore.set("email_to_verify", email, { 
        maxAge: 10 * 60, // expire in 10 minutes 
    }); 

    // redirect after email sent.
    redirect("/auth/verify"); 
}


export async function forgotAction(formData: FormData) {
    const email = formData.get("email") as string;

    if (!email) {
        return { error: "Email is missing" }
    }

    await connectDatabase();
    const account = await checkExisting(email);

    if (!account) {
        return { error: "Account does not exist" };
    }

    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const from = process.env.EMAIL_USER;
    const to = email;
    const subject = "EduChest - Password Reset";
    const url = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/verify?token=${await createForgotToken(email)}&forgot=true`;
    const message = `Hello, clicking the link below will delete your account. Don’t worry—your data will be retained, and you can recreate your account using the same email to reset your password:\n\n${url}`;
    await transporter.sendMail({ from, to, subject, text: message }) as nodemailer.SentMessageInfo;

    // Set allow verify route to be accessed
    const cookieStore = await cookies();
    cookieStore.set("email_to_verify", email, { 
        maxAge: 10 * 60, // expire in 10 minutes 
    }); 

    // redirect after email sent.
    redirect("/auth/verify"); 
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    redirect('/auth/login');
}