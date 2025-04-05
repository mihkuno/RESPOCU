import { viewAccounts } from "@/actions/accounts";
import Accounts from "./accounts";

export default async function AccountsLayout() {
    // Fetch accounts data
    const accounts = await viewAccounts();
    return <Accounts accountList={accounts} />;
}