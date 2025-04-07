
import Archive from './archive';
import { viewArchived } from '@/actions/study';

export default async function ArchiveLayout() {

    // TODO: get the email from the headers
    const email = "caindayjoeninyo@gmail.com";

    const response = await viewArchived(email);

    return <Archive archivedStudies={response} />;
}