import { db } from "@/api/firebase";
import { NewsItem } from "@/lib/types";
import Head from "next/head"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DocumentData, QueryDocumentSnapshot, collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";

const news = () => {
    const [data, setData] = useState<NewsItem[]>([]);
    const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
    const [loading, setLoading] = useState(false);

    const locale = useRouter().locale || 'ka';

    const fetchNews = async () => {
        setLoading(true);
        const newsRef = collection(db, 'news');
        const q = query(newsRef, orderBy('created_at', 'desc'), limit(10));
        const querySnapshot = await getDocs(q);
        const newsItems = querySnapshot.docs.map(doc => doc.data() as NewsItem);
        setData(newsItems);
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setLoading(false);
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchMoreNews = async () => {
        if (!lastVisible) return;

        setLoading(true);
        const newsRef = collection(db, 'news');
        const q = query(newsRef, orderBy('created_at', 'desc'), startAfter(lastVisible), limit(10));
        const querySnapshot = await getDocs(q);
        const newNewsItems = querySnapshot.docs.map(doc => doc.data() as NewsItem);
        setData(prev => [...prev, ...newNewsItems]);
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setLoading(false);
    };


    // TODO: make card pressable and news[index] page
    // TODO: make transparent the container bg to black
    // TODO: make load more a little bit better looking

    return (
        <>
            <Head>
                <title>სიახლეები | საინგილო</title>
                <meta
                    name="description"
                    content="საინგილოს დამოუკიდებელი საინფორმაციო ვებ გვერდი"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:image" content="/saingilo_preview.png" />
                <link rel="icon" href="/logovazi.svg" />
            </Head>

            <div className="pg bg-black text-white p-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {data.map((item, index) => (
                        <div key={index} className="relative bg-gray-800 rounded-lg shadow-md overflow-hidden">
                            <img src={item.header} alt="" className="w-full h-auto md:h-60 object-cover" />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                <h4 className="text-md font-bold mb-2 text-white">{item.title[locale]}</h4>
                                <p className="text-sm text-white">{item.content[locale].substring(0, 100)}...</p>
                            </div>
                        </div>
                    ))}
                </div>
                {loading && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="spinner border-4 border-t-4 border-t-white border-gray-300 h-12 w-12 rounded-full animate-spin"></div>
                    </div>
                )}
                {lastVisible && <button onClick={fetchMoreNews} disabled={loading} className="block mx-auto mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">Load More</button>}
            </div>
        </>
    )
}

export default news
