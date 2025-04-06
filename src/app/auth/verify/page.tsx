
import Verification from "./verify";

export default async function VerifiacationLayout({ searchParams }: { searchParams: { token: string } }) {
    const params = await searchParams;
    const token = params.token;

    if (token) {
        return <Verification initialState="loading" />;
    }
    return <Verification initialState="default" />;
}