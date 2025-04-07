// app/dashboard/layout.jsx
import DashboardClient from '@/app/dashboard/(components)/dashboard';
import { ProfileProvider } from "@/providers/profileContext";
import { headers } from "next/headers";

// Server component
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
 
  const headersList = await headers();
  const email = headersList.get('email') as string;
  const type = headersList.get('type') as string;
 
  return (
    <ProfileProvider profileData={{ email, isAdmin: type === "admin" }}>
      <DashboardClient>
        {children}
      </DashboardClient>
    </ProfileProvider>
  );
}