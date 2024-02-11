import useSWR from "swr";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";

import { db } from "@/api/firebase";
import { NewsItem } from "@/lib/types";
import EmptyCard from "@/components/empty_card";

const ITEMS_PER_PAGE = 10;

/*
    @param {number} page - The page number to fetch
    @returns {Promise<NewsItem[]>} - An array of news items
    @description Fetches news items from the database
*/
export const fetchNews = async (page: number) => {
    const newsRef = collection(db, "news");
    const orderQuery = orderBy("created_at", "desc");
    let q = query(newsRef, orderQuery, limit(ITEMS_PER_PAGE));
  

    if (page > 1) {
      const lastItem = await (
        await getDocs(
          query(
            newsRef,
            orderQuery,
            limit((page - 1) * ITEMS_PER_PAGE)
          )
        )
      ).docs.pop();
      q = query(
        newsRef,
        orderQuery,
        startAfter(lastItem),
        limit(ITEMS_PER_PAGE)
      );
    }

  const querySnapshot = await getDocs(q);
  const newsItems = querySnapshot.docs.map((doc) => doc.data() as NewsItem);
  return newsItems;
};

const News = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 1;
  const { data, error } = useSWR<NewsItem[]>(`news/${page}`, () =>
    fetchNews(page)
  );
  const loading = !data && !error;
  const locale = router.locale || "ka";

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
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              key={item.id}
            >
              <Link href={`/news/${item.id}`}>
                <div
                  key={index}
                  className="relative bg-gray-800 rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={item.header}
                    alt=""
                    className="w-full h-auto md:h-60 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h4 className="text-md font-bold mb-2 text-white">
                      {item.title[locale]}
                    </h4>
                    <p className="text-sm text-white">
                      {item.content[locale].substring(0, 100)}...
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <EmptyCard />
        )}

        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="spinner border-4 border-t-4 border-t-white border-gray-300 h-12 w-12 rounded-full animate-spin"></div>
          </div>
        )}
        <div className="flex flex-1 justify-between sm:justify-end">
          {page > 1 && (
            <a
              href={`/news?page=${page - 1}`}
              className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
            >
              Previous
            </a>
          )}
          {data && data.length > 0 && (
            <button
              onClick={() => router.push(`/news?page=${page + 1}`)}
              className={`relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 ${
                data.length < ITEMS_PER_PAGE
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={data.length < ITEMS_PER_PAGE}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default News;
