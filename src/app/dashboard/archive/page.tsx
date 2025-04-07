
import Archive from './archive';
import { viewArchived } from '@/actions/study';
import { headers } from 'next/headers';

export default async function ArchiveLayout() {

    const headersList = await headers();
    const email = headersList.get('email') as string;
    const type = headersList.get('type') as string;

    const response = await viewArchived(email);

    return <Archive archivedStudies={response} />;
}