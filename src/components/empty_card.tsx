import { useRouter } from 'next/router';
import getLocale from '../lib/locale';

export default function EmptyCard(): JSX.Element {
    const router = useRouter();
    const locale = getLocale(router.locale);

    return (
        <div
            className='flex max-w-lg mx-auto justify-center items-center bg-zinc-950 rounded-lg shadow-md overflow-hidden p-4'
        >
            <div className="bg-zinc-950 rounded-lg shadow-md overflow-hidden p-4">
                <h4 className="text-md font-bold mb-2 text-white">{locale.no_news_found}</h4>
            </div>
        </div>
    )
}