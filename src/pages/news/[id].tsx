import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { DocumentReference, collection, doc } from "firebase/firestore";

import { db } from '@/api/firebase';
import { getData } from '@/lib/fetcher';
import { NewsItem } from '@/lib/types';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const id = context.params?.id as string;
    const mainCol = collection(db, 'news');
    const docRef = doc(mainCol, id);
    const newsItem = await getData<NewsItem>(docRef as DocumentReference<NewsItem>);

    return { props: { newsItem } };
};

/*
  * This function is used to parse the timestamp to a date string.
  * @param timestamp - The timestamp to be parsed.
  * @returns - The date string.
*/
function parseTimestampToDateString(timestamp: string): string {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 because months are 0-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export default function NewsDetailPage({ newsItem }: { newsItem: NewsItem }) {
    const locale = useRouter().locale || 'ka';

    if (!newsItem) {
        return <div className='pg'>News item not found.</div>;
    }

    return (
        <>
            <Head>
                <title>{newsItem.title[locale]}</title>
                <meta
                    name="description"
                    content={`${newsItem.content[locale].substring(0, 100)}...`}
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:image" content={newsItem.header} />
                <link rel="icon" href="/logovazi.svg" />
            </Head>
            <div className="pg bg-black flex flex-col items-center text-white">
                <div className="flex flex-col items-center w-full md:w-3/4 xl:w-1/2">
                    <div className='p-5'>
                        <img src={newsItem.header} alt={newsItem.title[locale]} className="mb-4 w-full rounded-lg" />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-center px-4 md:px-6 pb-5">{newsItem.title[locale]}</h1>
                </div>
                <div className="divider-no-border w-1/2"></div>
                <p className="text-lg mx-4 mt-2 p-3 md:p-6 md:text-xl text-center w-full md:w-3/4 xl:w-1/2 text-white opacity-90">{newsItem.content[locale]}</p>
                <div className="mt-4 mb-2 text-center w-full md:w-3/4 xl:w-1/2 text-lg text-white opacity-70">
                    <span>{parseTimestampToDateString(newsItem.created_at.toString())}</span> - <span>{newsItem.author}</span>
                </div>
            </div>
        </>
    );
}
